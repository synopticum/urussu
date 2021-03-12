import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { PathDto } from 'src/contracts/entities/path';
import { map } from 'src/stores/MapStore/PathsStore/map';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { LatLngExpression } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const pathsStore = new PathsStore(api);
