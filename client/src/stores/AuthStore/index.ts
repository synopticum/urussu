import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { api, BaseStore } from 'src/stores';

type Code = string;
export type Token = string;

export default class AuthStore implements BaseStore {
  private api: AxiosInstance;

  token: Token = null;

  resetData(): void {
    this.logout();
  }

  async login(code?: Code): Promise<boolean> {
    this.token = await this.getToken(code);

    if (!this.token) {
      localStorage.removeItem('token');
      console.info('No token found, you are not logged in');
      return false;
    }

    if (await this.isTokenValid()) {
      localStorage.setItem('token', this.token);
      return true;
    } else {
      this.logout();
      console.info('Token is invalid');
      return false;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async getToken(code?: Code): Promise<Token> {
    const token = localStorage.getItem('token');

    if (token) {
      return token;
    }

    if (code) {
      return await this.getNewToken(code);
    }

    return null;
  }

  private async getNewToken(code: Code): Promise<Token> {
    try {
      const { data } = await this.api.get(`/authenticate?code=${code}`);

      if (data.error) {
        console.info('Cannot get new token, the auth code is invalid');
        return null;
      }

      return data.token;
    } catch (e) {
      return null;
    }
  }

  private async isTokenValid(): Promise<boolean> {
    try {
      const { data } = await this.api.get(`/checkToken?token=${this.token}`);
      return Boolean(data);
    } catch (e) {
      return false;
    }
  }

  get isLogged(): boolean {
    return Boolean(this.token);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      token: observable,
      isLogged: computed,
    });
  }
}

export const authStore = new AuthStore(api);
