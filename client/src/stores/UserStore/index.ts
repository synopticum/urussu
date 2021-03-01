import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';

export default class UserStore {
  private api: AxiosInstance;
  // apiData = new AsyncData<string>();

  code: string = localStorage.getItem('code') || null;

  setCode(value: string): void {
    this.code = value;
    localStorage.setItem('code', value);
  }

  constructor(api: AxiosInstance) {
    makeObservable(this, {
      code: observable,
      // apiData: observable,
    });
  }
}
