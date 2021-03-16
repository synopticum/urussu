import { Map, polyline } from 'leaflet';
import { getClassName, removeCurrentEntities } from 'src/pages/MapPage/Map/Container';
import { mapStore } from 'src/stores/MapStore';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';

const addPathsToMap = (map: Map, data: PathMapped[]): void => {
  const setEntity = (id: string): void => {
    mapStore.setEntity({ type: 'path', id });
  };

  data.forEach(item => {
    polyline(item.coordinates, {
      color: 'green',
      weight: 8,
      className: getClassName(item),
    })
      .on('click', () => setEntity(item.id))
      .addTo(map);
  });
};

export const drawPaths = (map: Map, data: PathMapped[]): void => {
  removeCurrentEntities(map, 'paths');
  addPathsToMap(map, data);
};
