import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { PathDto } from 'src/contracts/entities/path';
import { map } from 'src/stores/MapStore/PathsStore/map';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { LatLngExpression } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { EntityId } from 'src/contracts/entities';

export default class PathsStore extends BaseAsyncStore<PathDto[], PathMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<PathDto[], PathMapped[]>('/paths', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<PathMapped[]>();
  }

  async add(coordinates: LatLngExpression[]): Promise<void> {
    const id = uuidv4();
    const url = `/paths/${id}`;

    const path: PathMapped = {
      id,
      instanceType: 'path',
      coordinates,
    };

    try {
      const newPathDto = await put<PathDto, PathMapped>(url, path, 'json');
      const [newPathMapped] = map([newPathDto]);
      this.apiData.data.push(newPathMapped);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/paths/${id}`;

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

export const pathsStore = new PathsStore(api);
