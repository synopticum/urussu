import { Map, polyline } from 'leaflet';
import { controlsStore, mapStore } from 'src/stores';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import { getClassName } from 'src/components/Map/Container';

const removeCurrentPaths = (): void => {};

const addPathsToMap = (map: Map, data: PathMapped[]): void => {
  const handleClick = (id: string): void => {
    controlsStore.resetData();
    mapStore.setEntity({ type: 'path', id });
  };

  data.forEach(item => {
    polyline(item.coordinates, {
      color: 'green',
      weight: 8,
      className: getClassName(item),
    })
      .on('click', () => handleClick(item.id))
      .addTo(map);
  });
};

export const drawPaths = (map: Map, data: PathMapped[]): void => {
  removeCurrentPaths();
  addPathsToMap(map, data);
};
