import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { map, PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { PathDto } from 'src/contracts/entities/path';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { editorStore, PathState } from 'src/stores/MapStore/EntityStore/EditorStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { controlsStore } from 'src/stores/ControlsStore';
import { computed, makeObservable } from 'mobx';

export default class PathStore extends BaseAsyncStore<PathDto, PathMapped> implements BaseStore {
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
    await fetchData<PathDto, PathMapped>(`/paths/${id}`, this.getApiOptions(map));
    editorStore.initData(this, new PathState(this.apiData.data));
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    commentsStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped>();
    imagesStore.resetData();
    commentsStore.resetData();
    editorStore.resetData();
  }

  async update(): Promise<void> {
    const { data } = this.apiData;
    const url = `/paths/${data.id}`;

    const path = {
      ...data,
      ...editorStore.state,
    };

    try {
      const newPathDto = await put<PathDto, PathMapped>(url, path, 'json');
      this.apiData.data = map(newPathDto);
      controlsStore.toggle('editor');
    } catch (e) {
      alert('hui');
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

export const pathStore = new PathStore(api);
