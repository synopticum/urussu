import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { map, UserMapped } from 'src/stores/UserStore/map';
import { UserDto } from 'src/contracts/user';
import { api } from 'src/stores';

export type Author = {
  author: string;
  authorId: UserMapped['id'];
  authorVkId: UserMapped['vkId'];
};

export default class UserStore {
  private api: AxiosInstance;

  apiData = new AsyncData<UserMapped>();

  get author(): Author {
    const { data } = this.apiData;

    if (!data) {
      return null;
    }

    return {
      author: `${data.firstName} ${data.lastName}`,
      authorId: data.id,
      authorVkId: data.vkId,
    };
  }

  fetchApiData(): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<UserDto, UserMapped>('/user', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
      author: computed,
    });
  }
}

export const userStore = new UserStore(api);
