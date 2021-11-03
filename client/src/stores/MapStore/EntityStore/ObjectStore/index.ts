import { computed, makeObservable, observable } from 'mobx';
import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { map, ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { editorStore, ObjectState } from 'src/stores/MapStore/EntityStore/EditorStore';
import { controlsStore } from 'src/stores/ControlsStore';

export default class ObjectStore extends BaseAsyncStore<ObjectDto, ObjectMapped> implements BaseStore {
  siblings: ObjectMapped[];

  get siblingsIds(): { previous: EntityId; next: EntityId } {
    if (this.siblings) {
      const [previous, next] = this.siblings;
      return {
        previous: previous?.id,
        next: next?.id,
      };
    }
  }

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

  async initData(id: ImageId): Promise<void> {
    imagesStore.store = this;
    commentsStore.store = this;
    await this.fetchApiData(id);

    const { street, house } = this.apiData.data;
    await this.fetchStreetSiblings(street, house);
  }

  private async fetchStreetSiblings(street: string, house: string): Promise<ObjectMapped[]> {
    if (street) {
      try {
        const { data } = await this.api.get(`/objects?street=${street}&house=${house}`);

        if (data.error) {
          console.info('Cannot get fetch siblings');
          return null;
        }

        this.siblings = data;
      } catch (e) {
        return null;
      }
    }
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped>();
    imagesStore.resetData();
    commentsStore.resetData();
    editorStore.resetData();
  }

  async update(): Promise<void> {
    const { data } = this.apiData;
    const url = `/objects/${data.id}`;

    const object = {
      ...data,
      ...editorStore.state,
    };

    try {
      const newObjectDto = await put<ObjectDto, ObjectMapped>(url, object, 'json');
      this.apiData.data = map(newObjectDto);
      controlsStore.toggle('editor');
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);

    makeObservable(this, {
      address: computed,
      title: computed,
      siblings: observable,
      siblingsIds: computed,
    });
  }
}

export const objectStore = new ObjectStore(api);
