import { makeObservable, observable } from 'mobx';
import { LatLngBoundsExpression, LatLngTuple, Map } from 'leaflet';
import { AxiosInstance } from 'axios';
import { EntityId, EntityType } from 'src/contracts/entities';
import { api } from 'src/stores';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { map, SearchResultMapped } from 'src/stores/ControlsStore/map';
import { SearchResultDto } from 'src/contracts/search';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';

export type Entity = {
  type: EntityType;
  id: EntityId;
};

export const getEntity = (params: URLSearchParams): Entity => {
  const [type, id] = params.get('entity').split(',');

  if (type !== 'dot' && type !== 'object' && type !== 'path') {
    throw Error('Wrong entity type');
  }

  return { type, id };
};

export default class MapStore {
  private readonly api: AxiosInstance;
  private readonly defaultZoom = 5;
  private readonly defaultLat = 69.65;
  private readonly defaultLng = -20.25;

  readonly width: number = 10000;
  readonly height: number = 6250;
  readonly minZoom: number = 4;
  readonly maxZoom: number = 6;
  readonly maxBounds: LatLngBoundsExpression = [
    [39.5, -180],
    [100, 39.5],
  ];

  map: Map;
  entity: Entity;
  activeEntityId: EntityId;
  zoom: number;
  lat: number;
  lng: number;

  resetData(): void {
    this.map = null;
    this.entity = null;
    this.activeEntityId = null;
    this.zoom = this.defaultZoom;
    this.lat = this.defaultLat;
    this.lng = this.defaultLng;
  }

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
    this.activeEntityId = null;
    this.resetSearchData();

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

  searchData = new AsyncData<SearchResultMapped>();

  resetSearchData(): void {
    this.searchData = new AsyncData<SearchResultMapped>();
  }

  search(value: string): void {
    const { searchData } = this;
    const options = { apiData: searchData, map };

    fetchData<SearchResultDto, SearchResultMapped>(`/search?value=${value}`, options);
  }

  openDot({ id, coordinates }: DotMapped): void {
    this.activeEntityId = id;
    this.map.setView(coordinates, 6);
  }

  openObject({ id, coordinates }: ObjectMapped): void {
    this.activeEntityId = id;
    this.map.setView(coordinates[0][0], 6);
  }

  openPath({ id, coordinates }: PathMapped): void {
    this.activeEntityId = id;
    this.map.setView(coordinates[0], 6);
  }

  constructor(api: AxiosInstance) {
    this.api = api;
    this.map = null;
    this.entity = null;
    this.activeEntityId = null;

    if (location.search) {
      const params = new URLSearchParams(location.search);
      this.lat = parseInt(params.get('lat'));
      this.lng = parseInt(params.get('lng'));
      this.zoom = parseInt(params.get('zoom'));

      if (params.has('entity')) {
        this.entity = getEntity(params);
      }
    } else {
      this.zoom = this.defaultZoom;
      this.lat = this.defaultLat;
      this.lng = this.defaultLng;
      this.entity = null;
    }

    makeObservable(this, {
      map: observable,
      zoom: observable,
      lat: observable,
      lng: observable,
      entity: observable,
      activeEntityId: observable,
    });
  }
}

export const mapStore = new MapStore(api);
