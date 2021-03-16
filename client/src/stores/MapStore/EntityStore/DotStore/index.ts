import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { DotMapped, map } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { DotDto } from 'src/contracts/entities/dot';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { DotState, editorStore } from 'src/stores/MapStore/EntityStore/EditorStore';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';

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

  title: Pick<DotMapped, 'title'>;

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

  async update(id: EntityId): Promise<void> {
    const { data } = this.apiData;
    const url = `/dots/${id}`;

    const dot = {
      ...data,
      ...editorStore.state,
    };

    try {
      const newDotDto = await put<DotDto, DotMapped>(url, dot, 'json');
      this.apiData.data = map(newDotDto);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const dotStore = new DotStore(api);
