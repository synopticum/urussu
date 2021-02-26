import { LatLngBounds, tileLayer, Map, LatLngBoundsExpression, GridLayer, map } from 'leaflet';
import { Props } from 'src/components/UMap';

const createMapInstance = (): Map => {
  const mapInstance = map('map', {});
  mapInstance.doubleClickZoom.disable();

  return mapInstance;
};

const apply1pxGapFix = (): void => {
  if (window.navigator.userAgent.indexOf('Chrome') > -1) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const originalInitTile = GridLayer.prototype._initTile;
    GridLayer.include({
      _initTile: function (tile: { style: { width: string; height: string } }) {
        originalInitTile.call(this, tile);
        // eslint-disable-next-line react/no-this-in-sfc
        const tileSize = this.getTileSize();
        tile.style.width = tileSize.x + 1 + 'px';
        tile.style.height = tileSize.y + 1 + 'px';
      },
    });
  }
};

const setDefaultSettings = (map: Map): void => {
  let lat = 69.65;
  let lng = -20.25;
  let zoom = 5;

  if (location.search) {
    const params = new URLSearchParams(location.search);
    lat = parseInt(params.get('lat'));
    lng = parseInt(params.get('lng'));
    zoom = parseInt(params.get('zoom'));
  } else {
    const url = `?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}&zoom=${zoom}`;
    window.history.replaceState({}, '', url);
  }

  map.setView([lat, lng], zoom);
};

const setMaxBounds = (map: Map, maxBounds: LatLngBoundsExpression): void => {
  map.setMaxBounds(maxBounds);
};

const initializeTiles = (map: Map, options: Omit<Props, 'maxBounds'>): void => {
  const { width, height, minZoom, maxZoom } = options;
  const bounds = new LatLngBounds(map.unproject([0, height], maxZoom), map.unproject([width, 0], maxZoom));

  tileLayer(`/images/tiles/{z}/{x}/{y}.png.webp`, {
    minZoom: minZoom,
    maxZoom: maxZoom,
    bounds,
    noWrap: true,
  }).addTo(map);
};

export const drawMap = (map: Map, options: Props): void => {
  const mapInstance = createMapInstance();

  apply1pxGapFix();
  setDefaultSettings(mapInstance);
  setMaxBounds(mapInstance, options.maxBounds);
  initializeTiles(mapInstance, options);
};
