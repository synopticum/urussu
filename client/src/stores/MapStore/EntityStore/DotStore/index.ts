import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { DotMapped, map } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { DotDto } from 'src/contracts/entities/dot';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { DotState, editorStore } from 'src/stores/MapStore/EntityStore/EditorStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { controlsStore } from 'src/stores/ControlsStore';
import { computed, makeObservable } from 'mobx';

export default class DotStore extends BaseAsyncStore<DotDto, DotMapped> implements BaseStore {
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

  get title(): string {
    const { data } = this.apiData;

    if (!data || !data.title) {
      return null;
    }

    return data.title;
  }

  async fetchApiData(id: EntityId): Promise<void> {
    await fetchData<DotDto, DotMapped>(`/dots/${id}`, this.getApiOptions(map));
    editorStore.initData(this, new DotState(this.apiData.data));
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    commentsStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped>();
    imagesStore.resetData();
    commentsStore.resetData();
    editorStore.resetData();
  }

  async update(): Promise<void> {
    const { data } = this.apiData;
    const url = `/dots/${data.id}`;

    const dot = {
      ...data,
      ...editorStore.state,
    };

    try {
      const newDotDto = await put<DotDto, DotMapped>(url, dot, 'json');
      this.apiData.data = map(newDotDto);
      controlsStore.toggle('editor');
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);

    makeObservable(this, {
      title: computed,
    });
  }
}

export const dotStore = new DotStore(api);
