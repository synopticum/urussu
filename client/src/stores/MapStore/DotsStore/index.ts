import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/dots';
import { DotItem, map } from 'src/stores/MapStore/DotsStore/map';

export default class Index {
  private api: AxiosInstance;

  apiData = new AsyncData<DotItem[]>();

  fetchData = async (): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      const { data } = await this.api.get<DotDto[]>('/dots');

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
