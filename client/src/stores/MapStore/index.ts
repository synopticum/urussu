import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/dots';

export default class Index {
  private api: AxiosInstance;

  apiDots = new AsyncData<DotDto[]>();

  private fetchDots = async (): Promise<void> => {
    const { apiDots } = this;
    apiDots.isFetching = true;

    try {
      const { data } = await this.api.get<DotDto[]>('/dots');

      apiDots.error = null;
      apiDots.data = data;
      apiDots.isFetching = false;
      apiDots.isDataLoaded = true;
    } catch (e) {
      apiDots.error = e.message;
      apiDots.isFetching = false;
    }
  };

  fetchData = async (): Promise<void[]> => {
    return Promise.all([this.fetchDots()]);
  };

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiDots: observable,
    });
  }
}
