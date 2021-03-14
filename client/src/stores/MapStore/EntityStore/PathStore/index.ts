import { AxiosInstance } from 'axios';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { PathMapped, map } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { PathDto } from 'src/contracts/entities/path';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { editorStore } from 'src/stores/MapStore/EntityStore/EditorStore';

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

  title: Pick<PathMapped, 'title'>;

  fetchApiData(id: EntityId): void {
    fetchData<PathDto, PathMapped>(`/paths/${id}`, this.getApiOptions(map));
  }

  initData(id: ImageId): void {
    imagesStore.store = this;
    editorStore.store = this;
    this.fetchApiData(id);
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped>();
    imagesStore.resetData();
  }

  update(): void {
    //
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const pathStore = new PathStore(api);
