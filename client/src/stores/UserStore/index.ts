import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { map, UserMapped } from 'src/stores/UserStore/map';
import { UserDto } from 'src/contracts/user';

export default class UserStore {
  private api: AxiosInstance;

  apiData = new AsyncData<UserMapped>();

  fetchApiData(token: string): void {
    const { api, apiData } = this;
    const options = { api, apiData, map, token };

    fetchData<UserDto, UserMapped>('/user', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
