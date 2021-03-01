import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';

export default class UserStore {
  private api: AxiosInstance;
  // apiData = new AsyncData<string>();

  get isLogged(): boolean {
    return Boolean(this.code);
  }

  code: string = localStorage.getItem('code') || null;

  setCode(value: string): void {
    this.code = value;
    localStorage.setItem('code', value);
  }

  logout(): void {
    this.code = null;
    localStorage.removeItem('code');
  }

  constructor(api: AxiosInstance) {
    makeObservable(this, {
      code: observable,
      isLogged: computed,
      // apiData: observable,
    });
  }
}
