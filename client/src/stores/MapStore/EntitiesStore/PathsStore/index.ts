import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { PathDto } from 'src/contracts/entities/path';
import { map } from 'src/stores/MapStore/EntitiesStore/PathsStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import { api } from 'src/stores';

export default class PathsStore {
  private api: AxiosInstance;

  apiData = new AsyncData<PathMapped[]>();

  fetchApiData(): void {
    const { api, apiData } = this;
    const options = { api, apiData, map };

    fetchData<PathDto[], PathMapped[]>('/paths', options);
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const pathsStore = new PathsStore(api);
