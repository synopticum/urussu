import { AxiosInstance } from 'axios';
import { AsyncData, del, fetchData, get, put } from 'src/stores/helpers';
import { ObjectDto, ObjectType } from 'src/contracts/entities/object';
import { map } from 'src/stores/MapStore/ObjectsStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { api, BaseAsyncStore, BaseStore } from 'src/stores';
import { circle, LatLngTuple, Polygon, polygon } from 'leaflet';
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
      this.drawObjects();
      this.drawCircles();
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  async update(id: EntityId, coordinates: LatLngTuple[][]): Promise<void> {
    const url = `/objects/${id}`;

    try {
      const object = await get<ObjectDto, ObjectMapped>(`/objects/${id}`, 'json');
      await put<ObjectDto, ObjectMapped>(url, { ...object, coordinates }, 'json');
    } catch (e) {
      alert('Ошибка');
    }
  }

  async remove(id: EntityId): Promise<void> {
    const url = `/objects/${id}`;

    try {
      await del(url);
      this.apiData.data = this.apiData.data.filter(item => item.id !== id);
      this.drawObjects();
      this.drawCircles();
    } catch (e) {
      alert('Ошибка');
      // handle somehow
    }
  }

  drawObjects(): void {
    const { map } = mapStore;

    removeCurrentEntities(map, 'objects');
    this.addObjectsToMap();
  }

  drawCircles(): void {
    const { map } = mapStore;

    removeCurrentEntities(map, 'circles');
    this.addCirclesToMap();
  }

  private static getObjectColor(object: ObjectMapped): string {
    if (object.noAddress) {
      return '#00f';
    }

    if (object.street && object.house) {
      return '#ffc600';
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
      const p = polygon(item.coordinates, {
        color: ObjectsStore.getObjectColor(item),
        className: getClassName(item),
        weight: 2,
      })
        .on('click', () => setEntity(item.id))
        .addTo(map);

      // this.enableDragging(p);
    });
  }

  private enableDragging(p: Polygon): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    p.dragging.enable();

    p.on('dragend', ({ target }) => {
      const { _path, _latlngs: coordinates } = target;
      const id = _path
        .getAttribute('class')
        .split(' ')
        .find((className: string) => className.startsWith('id'))
        .substring(3);

      this.update(id, coordinates);
    });
  }

  private addCirclesToMap(): void {
    const { map } = mapStore;
    const { data } = this.apiData;

    const circles = data.filter(object => object.type === 'circle');

    const setEntity = (id: string): void => {
      mapStore.setEntity({ type: 'object', id });
    };

    circles.forEach(item => {
      const { coordinates, radius } = item;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      circle(coordinates[0], parseInt(radius), {
        color: 'rgb(255, 198, 0)',
        weight: 2,
        className: getClassName(item),
        radius,
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
