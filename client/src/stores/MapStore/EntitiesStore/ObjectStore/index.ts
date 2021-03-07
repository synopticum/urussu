import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped, map } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { EntityId } from 'src/contracts/entities';
import { api } from 'src/stores';

export default class ObjectStore {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped>();

  fetchApiData(id: EntityId): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<ObjectDto, ObjectMapped>(`/objects/${id}`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const objectStore = new ObjectStore(api);
