import { Map, polyline } from 'leaflet';
import { mapStore } from 'src/stores';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';

const removeCurrentPaths = (): void => {};

const addPathsToMap = (map: Map, data: PathMapped[]): void => {
  const handleClick = (id: string): void => mapStore.setEntity({ type: 'path', id });

  data.forEach(item => {
    polyline(item.coordinates, {
      color: 'green',
      weight: 8,
    })
      .on('click', () => handleClick(item.id))
      .addTo(map);
  });
};

export const drawPaths = (map: Map, data: PathMapped[]): void => {
  removeCurrentPaths();
  addPathsToMap(map, data);
};
