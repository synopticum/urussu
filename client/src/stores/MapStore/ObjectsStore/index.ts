import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/objects';
import { map, ObjectMapped } from 'src/stores/MapStore/ObjectsStore/map';

export default class Index {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped[]>();

  fetchApiData(): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<ObjectDto[], ObjectMapped[]>('/objects', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
