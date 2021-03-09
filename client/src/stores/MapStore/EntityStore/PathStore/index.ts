import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId, ImageId } from 'src/contracts/entities';
import { PathMapped, map } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { PathDto } from 'src/contracts/entities/path';
import { api, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

export default class PathStore implements BaseStore {
  private api: AxiosInstance;

  apiData = new AsyncData<PathMapped>();

  fetchApiData(id: EntityId): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<PathDto, PathMapped>(`/paths/${id}`, options);
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped>();
    imagesStore.resetData();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const pathStore = new PathStore(api);
