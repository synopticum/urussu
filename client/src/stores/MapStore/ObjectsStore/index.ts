import { AxiosInstance } from 'axios';
import { AsyncData, del, fetchData, put } from 'src/stores/helpers';
import { ObjectDto, ObjectType } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { LatLngTuple } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { EntityId } from 'src/contracts/entities';

export default class ObjectsStore extends BaseAsyncStore<ObjectDto[], ObjectMapped[]> implements BaseStore {
  fetchApiData(): void {
    fetchData<ObjectDto[], ObjectMapped[]>('/objects', this.getApiOptions(map));
  }

  resetData(): void {
    this.apiData = new AsyncData<ObjectMapped[]>();
  }

  async add(type: ObjectType, coordinates: LatLngTuple[][], radius?: number): Promise<void> {
    const id = uuidv4();
    const url = `/objects/${id}`;

    const object: ObjectMapped = {
      id,
      type,
      instanceType: 'object',
      coordinates: type === 'object' ? coordinates : ((coordinates as unknown) as LatLngTuple[][]),
      radius,
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

  async remove(id: EntityId): Promise<void> {
    const url = `/objects/${id}`;

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

export const objectsStore = new ObjectsStore(api);
