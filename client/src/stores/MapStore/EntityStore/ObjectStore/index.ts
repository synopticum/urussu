import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped, map } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { EntityId, ImageId } from 'src/contracts/entities';
import { api, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';

export default class ObjectStore implements BaseStore {
  private api: AxiosInstance;

  apiData = new AsyncData<ObjectMapped>();

  fetchApiData(id: EntityId): void {
    const { apiData } = this;
    const options = { apiData, map };

    fetchData<ObjectDto, ObjectMapped>(`/objects/${id}`, options);
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    commentsStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped>();
    imagesStore.resetData();
  }

  get address(): string {
    const { data } = this.apiData;

    if (!data || !data.street) {
      return null;
    }

    return `${data.street}, ${data.house}`;
  }

  constructor(api: AxiosInstance) {
    this.api = api;

    makeObservable(this, {
      apiData: observable,
      address: computed,
    });
  }
}

export const objectStore = new ObjectStore(api);
