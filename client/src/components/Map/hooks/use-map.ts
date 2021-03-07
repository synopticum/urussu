import { GridLayer, LatLngBounds, LatLngBoundsExpression, Map, map, tileLayer } from 'leaflet';
import { RefObject, useEffect } from 'react';
import { debounce } from 'ts-debounce';
import { useRotatedMarker } from 'src/components/Map/hooks/use-rotated-marker';
import { mapStore } from 'src/stores/MapStore';

const createMap = (mapRootNode: HTMLElement): Map => {
  const mapInstance = map(mapRootNode, {
    zoomControl: false,
  });
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

        const tileSize = this.getTileSize();
        tile.style.width = tileSize.x + 1 + 'px';
        tile.style.height = tileSize.y + 1 + 'px';
      },
    });
  }
};

const setInitialSettings = (): void => {
  const { map, lat, lng, zoom, entity } = mapStore;

  let url = `?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}&zoom=${zoom}`;

  if (entity) {
    url += `&entity=${entity.type},${entity.id}`;
  }

  window.history.replaceState({}, '', url);
  map.setView([lat, lng], zoom);
};

const setMaxBounds = (maxBounds: LatLngBoundsExpression): void => {
  const { map } = mapStore;
  map.setMaxBounds(maxBounds);
};

const initializeTiles = (): void => {
  const { map, width, height, minZoom, maxZoom } = mapStore;
  const bounds = new LatLngBounds(map.unproject([0, height], maxZoom), map.unproject([width, 0], maxZoom));

  tileLayer(`/images/tiles/{z}/{x}/{y}.png.webp`, {
    minZoom: minZoom,
    maxZoom: maxZoom,
    bounds,
    noWrap: true,
  }).addTo(map);
};

export const updateSettings = (): void => {
  const { map } = mapStore;
  const zoom = map.getZoom();
  const { lat, lng } = map.getCenter();

  mapStore.setZoom(zoom);
  mapStore.setLatLng([lat, lng]);
};

const debouncedUpdateSettings = debounce(updateSettings, 50);

const drawMap = (mapRootNode: HTMLElement): Map => {
  const map = createMap(mapRootNode);
  mapStore.map = map;
  const { maxBounds } = mapStore;

  map.on('zoomend', () => updateSettings());
  map.on('drag', () => debouncedUpdateSettings());

  apply1pxGapFix();
  setInitialSettings();
  setMaxBounds(maxBounds);
  initializeTiles();

  return map;
};

export const useMap = (containerRef: RefObject<HTMLDivElement>): void => {
  const { map } = mapStore;
  useRotatedMarker();

  useEffect(() => {
    if (containerRef.current && !map) {
      mapStore.map = drawMap(containerRef.current);
    }

    return (): void => {
      if (map) {
        mapStore.map = null;
      }
    };
  }, [containerRef.current, map]);
};
