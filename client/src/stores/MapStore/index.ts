import { computed, makeObservable, observable } from 'mobx';
import { GridLayer, LatLngBounds, LatLngBoundsExpression, LatLngTuple, Map, tileLayer } from 'leaflet';
import { AxiosInstance } from 'axios';
import { EntityId, EntityType } from 'src/contracts/entities';
import { api, BaseStore } from 'src/stores';
import { AsyncData, fetchData } from 'src/stores/helpers';
import { map, SearchResultMapped } from 'src/stores/ControlsStore/map';
import { SearchResultDto } from 'src/contracts/search';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';
import { map as leafletMap } from 'leaflet';
import { debounce } from 'ts-debounce';

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

export default class MapStore implements BaseStore {
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

  setEntity(entity: Entity): void {
    this.activeEntityId = null;
    this.resetSearchData();

    this.entity = entity;
  }

  /**
   * Getter consumed by simple internal router, made specially for map page
   */
  get route(): string {
    let route = `?lat=${this.lat.toFixed(2)}&lng=${this.lng.toFixed(2)}&zoom=${this.zoom}`;

    if (this.entity) {
      route += `&entity=${this.entity.type},${this.entity.id}`;
    }

    if (imagesStore.selectedImageId) {
      route += `&image=${imagesStore.selectedImageId}`;
    }

    return route;
  }

  /**
   * Methods responsible for search on a map
   */
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

  /**
   * Methods responsible for drawing map using Leaflet.js
   */
  drawMap(mapRootNode: HTMLElement): void {
    this.createMap(mapRootNode);
    const { maxBounds } = this;
    const debouncedUpdateSettings = debounce(this.updateSettings.bind(this), 50);

    this.map.on('zoomend', this.updateSettings.bind(this));
    this.map.on('drag', () => debouncedUpdateSettings());

    this.apply1pxGapFix();
    this.setInitialSettings();
    this.setMaxBounds(maxBounds);
    this.initializeTiles();
  }

  private createMap(mapRootNode: HTMLElement): void {
    this.map = leafletMap(mapRootNode, {
      zoomControl: false,
    });

    this.map.doubleClickZoom.disable();
  }

  private apply1pxGapFix(): void {
    if (window.navigator.userAgent.indexOf('Chrome') > -1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const originalInitTile = GridLayer.prototype._initTile;

      GridLayer.include({
        _initTile: function (tile: { style: { width: string; height: string } }) {
          originalInitTile.call(this, tile);

          const tileSize = this.getTileSize();
          tile.style.width = tileSize.x + 1 + 'px';
          tile.style.height = tileSize.y + 1 + 'px';
        },
      });
    }
  }

  private setInitialSettings = (): void => {
    const { map, lat, lng, zoom } = this;
    map.setView([lat, lng], zoom);
  };

  private setMaxBounds(maxBounds: LatLngBoundsExpression): void {
    const { map } = this;
    map.setMaxBounds(maxBounds);
  }

  private initializeTiles(): void {
    const { map, width, height, minZoom, maxZoom } = this;
    const bounds = new LatLngBounds(map.unproject([0, height], maxZoom), map.unproject([width, 0], maxZoom));

    tileLayer(`/images/tiles/{z}/{x}/{y}.png.webp`, {
      minZoom,
      maxZoom,
      bounds,
      noWrap: true,
    }).addTo(map);
  }

  private updateSettings(): void {
    const zoom = this.map.getZoom();
    const { lat, lng } = this.map.getCenter();

    this.setZoom(zoom);
    this.setLatLng([lat, lng]);
  }

  private setZoom(zoom: number): void {
    this.zoom = zoom;
  }

  private setLatLng([lat, lng]: LatLngTuple): void {
    this.lat = lat;
    this.lng = lng;
  }

  /**
   * @constructor
   */
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
      route: computed,
    });
  }
}

export const mapStore = new MapStore(api);
