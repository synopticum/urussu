import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/EntitiesStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { api } from 'src/stores';

export default class ObjectsStore {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped[]>();

  fetchApiData(): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<ObjectDto[], ObjectMapped[]>('/objects', options);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped[]>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const objectsStore = new ObjectsStore(api);
