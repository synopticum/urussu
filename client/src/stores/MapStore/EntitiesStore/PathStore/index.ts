import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId } from 'src/contracts/entities';
import { PathMapped, map } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import { PathDto } from 'src/contracts/entities/paths';

export default class PathStore {
  private api: AxiosInstance;

  apiData = new AsyncData<PathMapped>();

  fetchApiData(id: EntityId): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<PathDto, PathMapped>(`/paths/${id}`, options);
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped>();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}
