import { makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId, ImageId } from 'src/contracts/entities';
import { DotMapped, map } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { DotDto } from 'src/contracts/entities/dot';
import { api, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

export default class DotStore implements BaseStore {
  private api: AxiosInstance;

  apiData = new AsyncData<DotMapped>();

  fetchApiData(id: EntityId): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<DotDto, DotMapped>(`/dots/${id}`, options);
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped>();
    imagesStore.resetData();
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
    });
  }
}

export const dotStore = new DotStore(api);
