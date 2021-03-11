import { computed, makeObservable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { map, UserMapped } from 'src/stores/UserStore/map';
import { UserDto } from 'src/contracts/user';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';

export type Author = {
  author: string;
  authorId: UserMapped['id'];
  authorVkId: UserMapped['vkId'];
};

export default class UserStore extends BaseAsyncStore<UserDto, UserMapped> implements BaseStore {
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

  get isAdmin(): boolean {
    const { data } = this.apiData;

    if (!data) {
      return null;
    }

    return data.role === 'admin';
  }

  fetchApiData(): void {
    fetchData<UserDto, UserMapped>('/user', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<UserMapped>();
  }

  constructor(api: AxiosInstance) {
    super(api);

    makeObservable(this, {
      author: computed,
      isAdmin: computed,
    });
  }
}

export const userStore = new UserStore(api);
