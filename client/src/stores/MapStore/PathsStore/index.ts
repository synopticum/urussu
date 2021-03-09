import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { PathDto } from 'src/contracts/entities/path';
import { map } from 'src/stores/MapStore/PathsStore/map';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';

export default class PathsStore extends BaseAsyncStore<PathDto[], PathMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<PathDto[], PathMapped[]>('/paths', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped[]>();
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const pathsStore = new PathsStore(api);
