import { ObjectDto } from 'src/contracts/objects';
import { circle, Map } from 'leaflet';

const removeCurrentCircles = (): void => {};

const addCirclesToMap = (map: Map, circles: ObjectDto[]): void => {
  circles.forEach(item => {
    const { coordinates, radius } = item;

    circle(coordinates[0], parseInt(radius), {
      color: 'rgb(255, 198, 0)',
      weight: 2,
    }).addTo(map);
  });
};

export const drawCircles = (map: Map, data: ObjectDto[]): void => {
  const circles = data.filter(object => object.instanceType === 'circle');

  removeCurrentCircles();
  addCirclesToMap(map, circles);
};
