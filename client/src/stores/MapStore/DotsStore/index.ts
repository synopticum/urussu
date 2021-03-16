import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { DotDto } from 'src/contracts/entities/dot';
import { map } from 'src/stores/MapStore/DotsStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { EntityId } from 'src/contracts/entities';
import { ObjectDto, ObjectType } from 'src/contracts/entities/object';
import { LatLngTuple } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { userStore } from 'src/stores/UserStore';
import { mapStore } from 'src/stores/MapStore';

export default class DotsStore extends BaseAsyncStore<DotDto[], DotMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<DotDto[], DotMapped[]>('/dots', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<DotMapped[]>();
  }

  async add(): Promise<void> {
    const id = uuidv4();
    const url = `/dots/${id}`;

    const coordinates = mapStore.tooltip.coordinates;
    const rotationAngle = 0;
    const layer = '1940';
    const authorId = userStore.author.authorId;

    const dot: DotMapped = {
      instanceType: 'dot',
      id,
      coordinates,
      rotationAngle,
      layer,
      authorId,
    };

    try {
      const newDotDto = await put<DotDto, DotMapped>(url, dot, 'json');
      const [newDotMapped] = map([newDotDto]);
      this.apiData.data.push(newDotMapped);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/dots/${id}`;

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

export const dotsStore = new DotsStore(api);
