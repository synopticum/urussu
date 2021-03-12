import { AxiosInstance } from 'axios';
import { AsyncData, fetchData, put } from 'src/stores/helpers';
import { ObjectDto } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { LatLngTuple } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

export default class ObjectsStore extends BaseAsyncStore<ObjectDto[], ObjectMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<ObjectDto[], ObjectMapped[]>('/objects', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped[]>();
  }

  async addObject(coordinates: LatLngTuple[][]): Promise<void> {
    const id = uuidv4();
    const url = `/objects/${id}`;

    const object: ObjectMapped = {
      id,
      type: 'object',
      instanceType: 'object',
      coordinates,
    };

    try {
      const newObjectDto = await put<ObjectDto, ObjectMapped>(url, object, 'json');
      const [newObjectMapped] = map([newObjectDto]);
      this.apiData.data.push(newObjectMapped);
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const objectsStore = new ObjectsStore(api);
