import axios, { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { makeObservable, observable } from 'mobx';

export const api = axios.create({
  baseURL: process.env.API_URL,
});

export interface BaseStore {
  resetData(): void;
}

export class BaseAsyncStore<Dto, Mapped> {
  apiData: AsyncData<Mapped>;

  private api: AxiosInstance;

  getApiOptions(map: (data: Dto) => Mapped): { apiData: AsyncData<Mapped>; map: (data: Dto) => Mapped } {
    const { apiData } = this;
    return { apiData, map };
  }

  constructor(api: AxiosInstance) {
    this.api = api;
    this.apiData = new AsyncData<Mapped>();

    makeObservable(this, {
      apiData: observable,
    });
  }
}
