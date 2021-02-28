import { Map, divIcon, marker, layerGroup, control, Marker, Control, LayerGroup } from 'leaflet';
import { DotDto } from 'src/contracts/dots';

type OverlayMaps = {
  [layerName: string]: LayerGroup;
};

let layerControl: Control.Layers = null;
const overlayMaps: OverlayMaps = {};

const getDotLayers = (data: DotDto[]): Set<string> => {
  return new Set(data.map(dot => dot.layer));
};

const createMarker = (dot: DotDto): Marker => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // id: dot.id,
    icon,
    draggable: false,
    // rotationAngle: dot.rotationAngle || 0,
  });
};

const removeCurrentLayersAndMarkers = (map: Map): void => {
  if (layerControl) layerControl.remove();
  if (overlayMaps) Object.values(overlayMaps).forEach(layer => map.removeLayer(layer));
};

const addMarkersToMap = (map: Map, data: DotDto[]): void => {
  for (const layerName of getDotLayers(data)) {
    const layerDots = data.filter(dot => dot.layer === layerName);
    overlayMaps[layerName] = layerGroup(layerDots.map(dot => createMarker(dot)));
  }
};

const addLayersToMap = (map: Map): void => {
  // debugger;
  Object.values(overlayMaps).forEach(layer => layer.addTo(map));
  layerControl = control.layers(null, overlayMaps).addTo(map);
};

export const drawDots = (map: Map, data: DotDto[]): void => {
  removeCurrentLayersAndMarkers(map);
  addMarkersToMap(map, data);
  addLayersToMap(map);
  // debugger;
};
