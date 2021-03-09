import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId, ImageId } from 'src/contracts/entities';
import { PathMapped, map } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { PathDto } from 'src/contracts/entities/path';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

export default class PathStore extends BaseAsyncStore<PathDto, PathMapped> implements BaseStore {
  fetchApiData(id: EntityId): void {
    fetchData<PathDto, PathMapped>(`/paths/${id}`, this.getApiOptions(map));
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
    super(api);
  }
}

export const pathStore = new PathStore(api);
