import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId } from 'src/contracts/entities';
import { DotMapped, map } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { DotDto } from 'src/contracts/entities/dots';

export default class DotStore {
  private api: AxiosInstance;

  apiData = new AsyncData<DotMapped>();

  fetchApiData(id: EntityId): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<DotDto, DotMapped>(`/dots/${id}`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
