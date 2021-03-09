import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId, ImageId } from 'src/contracts/entities';
import { DotMapped, map } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { DotDto } from 'src/contracts/entities/dot';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

export default class DotStore extends BaseAsyncStore<DotDto, DotMapped> implements BaseStore {
  fetchApiData(id: EntityId): void {
    fetchData<DotDto, DotMapped>(`/dots/${id}`, this.getApiOptions(map));
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
    super(api);
  }
}

export const dotStore = new DotStore(api);
