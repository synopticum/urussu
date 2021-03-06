import { makeObservable, observable } from 'mobx';
import { LatLngBoundsExpression, LatLngTuple, Map } from 'leaflet';
import ControlsStore from 'src/stores/MapStore/ControlsStore';
import { AxiosInstance } from 'axios';

export type Entity = {
  type: 'dot' | 'object' | 'path';
  id: string;
};

export const getEntity = (params: URLSearchParams): Entity => {
  const [type, id] = params.get('entity').split(',');

  if (type !== 'dot' && type !== 'object' && type !== 'path') {
    throw Error('Wrong entity type');
  }

  return { type, id };
};

export default class MapStore {
  readonly width: number = 10000;
  readonly height: number = 6250;
  readonly minZoom: number = 4;
  readonly maxZoom: number = 6;
  readonly maxBounds: LatLngBoundsExpression = [
    [39.5, -180],
    [100, 39.5],
  ];

  map: Map;
  zoom: number;
  lat: number;
  lng: number;
  entity: Entity;
  controls: ControlsStore;

  setZoom(zoom: number): void {
    this.zoom = zoom;
    this.updateRoute();
  }

  setLatLng([lat, lng]: LatLngTuple): void {
    this.lat = lat;
    this.lng = lng;
    this.updateRoute();
  }

  setEntity(entity: Entity): void {
    this.entity = entity;
    this.updateRoute();
  }

  updateRoute(): void {
    let url = `?lat=${this.lat.toFixed(2)}&lng=${this.lng.toFixed(2)}&zoom=${this.zoom}`;

    if (this.entity) {
      url += `&entity=${this.entity.type},${this.entity.id}`;
    }

    window.history.replaceState({}, '', url);

    this.map.setView([this.lat, this.lng], this.zoom);
  }

  constructor(api: AxiosInstance) {
    this.map = null;
    this.controls = new ControlsStore(api);

    if (location.search) {
      const params = new URLSearchParams(location.search);
      this.lat = parseInt(params.get('lat'));
      this.lng = parseInt(params.get('lng'));
      this.zoom = parseInt(params.get('zoom'));

      if (params.has('entity')) {
        this.entity = getEntity(params);
      }
    } else {
      this.zoom = 5;
      this.lat = 69.65;
      this.lng = -20.25;
      this.entity = null;
    }

    makeObservable(this, {
      map: observable,
      zoom: observable,
      lat: observable,
      lng: observable,
      entity: observable,
    });
  }
}
