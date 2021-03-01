import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/objects';
import { map, ObjectItem } from 'src/stores/MapStore/ObjectsStore/map';

export default class Index {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectItem[]>();

  fetchData = async (): Promise<void> => {
    const { apiData } = this;
    apiData.isFetching = true;

    try {
      const { data } = await this.api.get<ObjectDto[]>('/objects');

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
