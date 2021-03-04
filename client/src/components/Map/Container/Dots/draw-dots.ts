import { Map, divIcon, marker, layerGroup, control, Marker, Control, LayerGroup } from 'leaflet';
import { DotMapped } from 'src/stores/MapStore/DotsStore/map';

type OverlayMaps = {
  [layerName: string]: LayerGroup;
};

let layerControl: Control.Layers = null;
const overlayMaps: OverlayMaps = {};

const getDotLayers = (data: DotMapped[]): Set<string> => {
  return new Set(data.map(dot => dot.layer));
};

const createMarker = (dot: DotMapped): Marker => {
  let className;
  const year = dot.images ? Object.keys(dot.images)[0] : 1940;
  const hasMoreThanOneImage =
    dot.images && Array.isArray(Object.keys(dot.images)) && Object.keys(dot.images).length > 1;

  if (hasMoreThanOneImage) {
    className = `leaflet-marker-icon__${year}`;
  } else {
    className = `leaflet-marker-icon__${year}`;
  }

  if (!dot.title) className += ' ololo';

  const icon = divIcon({
    iconSize: [9, 9],
    className,
  });

  return marker(dot.coordinates, {
    icon,
    draggable: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    rotationAngle: dot.rotationAngle || 0,
  });
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
