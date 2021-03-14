import { computed, makeObservable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped, map } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { editorStore, ObjectState } from 'src/stores/MapStore/EntityStore/EditorStore';

export default class ObjectStore extends BaseAsyncStore<ObjectDto, ObjectMapped> implements BaseStore {
  get entityType(): EntityInstanceType {
    return 'object';
  }

  get entityId(): EntityId {
    const { data } = this.apiData;

    if (!data) {
      return null;
    }

    return data.id;
  }

  get address(): string {
    const { data } = this.apiData;

    if (!data || !data.street) {
      return null;
    }

    return `${data.street}, ${data.house}`;
  }

  get title(): string {
    const { data } = this.apiData;

    if (!data || !data.title) {
      return null;
    }

    return data.title;
  }

  async fetchApiData(id: EntityId): Promise<void> {
    await fetchData<ObjectDto, ObjectMapped>(`/objects/${id}`, this.getApiOptions(map));
    editorStore.initData(this, new ObjectState(this.apiData.data));
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    commentsStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped>();
    imagesStore.resetData();
    commentsStore.resetData();
    editorStore.resetData();
  }

  async update(id: EntityId): Promise<void> {
    const { data } = this.apiData;
    const url = `/objects/${id}`;

    const object = {
      ...data,
      ...editorStore.state,
    };

    try {
      const newObjectDto = await put<ObjectDto, ObjectMapped>(url, object, 'json');
      this.apiData.data = map(newObjectDto);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);

    makeObservable(this, {
      address: computed,
      title: computed,
    });
  }
}

export const objectStore = new ObjectStore(api);
