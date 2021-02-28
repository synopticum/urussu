import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { PathDto } from 'src/contracts/paths';
import { ObjectDto } from 'src/contracts/objects';

export default class Index {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectDto[]>();

  fetchData = async (): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      const { data } = await this.api.get<PathDto[]>('/paths');

      apiData.error = null;
      apiData.data = data;
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
