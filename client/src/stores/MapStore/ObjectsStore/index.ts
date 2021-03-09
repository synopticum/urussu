import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';

export default class ObjectsStore extends BaseAsyncStore<ObjectDto[], ObjectMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<ObjectDto[], ObjectMapped[]>('/objects', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped[]>();
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const objectsStore = new ObjectsStore(api);
