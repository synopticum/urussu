import { Map, polyline } from 'leaflet';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathsStore/map';

const removeCurrentPaths = (): void => {};

const addPathsToMap = (map: Map, data: PathMapped[]): void => {
  data.forEach(path => {
    polyline(path.coordinates, {
      color: 'green',
      weight: 8,
    }).addTo(map);
  });
};

export const drawPaths = (map: Map, data: PathMapped[]): void => {
  removeCurrentPaths();
  addPathsToMap(map, data);
};
