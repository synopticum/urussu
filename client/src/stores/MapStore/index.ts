import { makeObservable, observable } from 'mobx';
import { LatLngBoundsExpression, Map } from 'leaflet';

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
  currentZoom: number;

  constructor() {
    this.map = null;
    this.currentZoom = 5;

    makeObservable(this, {
      map: observable,
      currentZoom: observable,
    });
  }
}
