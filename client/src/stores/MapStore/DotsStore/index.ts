import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dot';
import { map } from 'src/stores/MapStore/DotsStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';

export default class DotsStore extends BaseAsyncStore<DotDto[], DotMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<DotDto[], DotMapped[]>('/dots', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped[]>();
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const dotsStore = new DotsStore(api);
