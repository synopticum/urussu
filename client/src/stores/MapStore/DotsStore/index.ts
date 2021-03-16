import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dot';
import { map } from 'src/stores/MapStore/DotsStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { EntityId } from 'src/contracts/entities';

export default class DotsStore extends BaseAsyncStore<DotDto[], DotMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<DotDto[], DotMapped[]>('/dots', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped[]>();
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/dots/${id}`;

    try {
      // await del(url);
      this.apiData.data = this.apiData.data.filter(item => item.id !== id);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const dotsStore = new DotsStore(api);
