import { AxiosInstance } from 'axios';
import { AsyncData, del, fetchData, put } from 'src/stores/helpers';
import { ObjectDto, ObjectType } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { LatLngTuple, Map, polygon } from 'leaflet';
import { v4 as uuidv4 } from 'uuid';
import { EntityId } from 'src/contracts/entities';
import { mapStore } from 'src/stores/MapStore';
import { getClassName, removeCurrentEntities } from 'src/pages/MapPage/Map/Container';

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
      this.draw();
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/objects/${id}`;

    try {
      await del(url);
      this.apiData.data = this.apiData.data.filter(item => item.id !== id);
      this.draw();
    } catch (e) {
      alert('hui');
      // handle somehow
    }
  }

  draw(): void {
    const { map } = mapStore;

    removeCurrentEntities(map, 'objects');
    this.addObjectsToMap();
  }

  private static getObjectColor(object: ObjectMapped): string {
    if (object.street && object.house) {
      return '#ffc600';
    } else if (object.street === '' && object.house === '') {
      return '#00f';
    }

    return '#f00';
  }

  private addObjectsToMap(): void {
    const { map } = mapStore;
    const { data } = this.apiData;

    const objects = data.filter(object => object.instanceType === 'object');

    const setEntity = (id: string): void => {
      mapStore.setEntity({ type: 'object', id });
    };

    objects.forEach((item: ObjectMapped) => {
      polygon(item.coordinates, {
        color: ObjectsStore.getObjectColor(item),
        className: getClassName(item),
        weight: 2,
      })
        .on('click', () => setEntity(item.id))
        .addTo(map);
    });
  }

  constructor(api: AxiosInstance) {
    super(api);
  }
}

export const objectsStore = new ObjectsStore(api);
