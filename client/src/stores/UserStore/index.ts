import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { map, User } from 'src/stores/UserStore/map';
import { UserDto } from 'src/contracts/user';

export default class UserStore {
  private api: AxiosInstance;

  apiData = new AsyncData<User>();

  fetchData = async (token: string): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      const { data } = await this.api.get<UserDto>('/user', {
        headers: {
          token,
        },
      });

      apiData.error = null;
      apiData.data = map(data);
      apiData.isFetching = false;
      apiData.isDataLoaded = true;
    } catch (e) {
      apiData.error = e.message;
      apiData.isFetching = false;
    }
  };

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
