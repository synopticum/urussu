import { Map, divIcon, marker, layerGroup, control, Marker, Control, LayerGroup } from 'leaflet';
import { getClassName } from 'src/pages/MapPage/Map/Container';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { mapStore } from 'src/stores/MapStore';

type OverlayMaps = {
  [layerName: string]: LayerGroup;
};

let layerControl: Control.Layers = null;
const overlayMaps: OverlayMaps = {};

const getDotLayers = (data: DotMapped[]): Set<string> => {
  return new Set(data.map(dot => dot.layer));
};

const createMarker = (item: DotMapped): Marker => {
  const icon = divIcon({
    iconSize: [9, 9],
    className: getClassName(item),
  });

  const setEntity = (id: string): void => {
    mapStore.setEntity({ type: 'dot', id });
  };

  return marker(item.coordinates, {
    icon,
    draggable: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rotationAngle: item.rotationAngle || 0,
  }).on('click', () => setEntity(item.id));
};

const removeCurrentLayersAndMarkers = (map: Map): void => {
  if (layerControl) layerControl.remove();
  if (overlayMaps) Object.values(overlayMaps).forEach(layer => map.removeLayer(layer));
};

const addMarkersToMap = (map: Map, data: DotMapped[]): void => {
  for (const layerName of getDotLayers(data)) {
    const layerDots = data.filter(dot => dot.layer === layerName);
    overlayMaps[layerName] = layerGroup(layerDots.map(createMarker));
  }
};

const addLayersToMap = (map: Map): void => {
  Object.values(overlayMaps).forEach(layer => layer.addTo(map));
  layerControl = control.layers(null, overlayMaps).addTo(map);
};

export const drawDots = (map: Map, data: DotMapped[]): void => {
  removeCurrentLayersAndMarkers(map);
  addMarkersToMap(map, data);
  addLayersToMap(map);
};
