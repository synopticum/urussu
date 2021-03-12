import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped, map } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { EntityId, ImageId } from 'src/contracts/entities';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';

export default class ObjectStore extends BaseAsyncStore<ObjectDto, ObjectMapped> implements BaseStore {
  get address(): string {
    const { data } = this.apiData;

    if (!data || !data.street) {
      return null;
    }

    return `${data.street}, ${data.house}`;
  }

  fetchApiData(id: EntityId): void {
    fetchData<ObjectDto, ObjectMapped>(`/objects/${id}`, this.getApiOptions(map));
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

  constructor(api: AxiosInstance) {
    super(api);

    makeObservable(this, {
      address: computed,
    });
  }
}

export const objectStore = new ObjectStore(api);
