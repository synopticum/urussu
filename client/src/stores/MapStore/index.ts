import { makeObservable, observable } from 'mobx';
import { LatLngBoundsExpression, Map } from 'leaflet';

export default class Index {
  mapObject: Map;
  width: number;
  height: number;
  minZoom: number;
  maxZoom: number;
  maxBounds: LatLngBoundsExpression;
  currentZoom: number;

  constructor() {
    this.mapObject = null;
    this.width = 10000;
    this.height = 6250;
    this.minZoom = 4;
    this.maxZoom = 6;
    this.maxBounds = [
      [39.5, -180],
      [100, 39.5],
    ];
    this.currentZoom = 5;

    makeObservable(this, {
      mapObject: observable,
      currentZoom: observable,
    });
  }
}
