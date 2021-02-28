import { PathDto } from 'src/contracts/paths';
import { Map, polyline } from 'leaflet';

const removeCurrentPaths = (): void => {};

const addPathsToMap = (map: Map, data: PathDto[]): void => {
  data.forEach(path => {
    polyline(path.coordinates, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      id: path.id,
      color: 'green',
      weight: 8,
    }).addTo(map);
  });
};

export const drawPaths = (map: Map, data: PathDto[]): void => {
  removeCurrentPaths();
  addPathsToMap(map, data);
};
