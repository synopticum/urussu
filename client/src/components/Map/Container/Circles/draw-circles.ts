import { circle, Map } from 'leaflet';
import { ObjectMapped } from 'src/stores/MapStore/ObjectStore/map';

const removeCurrentCircles = (): void => {};

const addCirclesToMap = (map: Map, circles: ObjectMapped[]): void => {
  circles.forEach(item => {
    const { coordinates, radius } = item;

    circle(coordinates[0], parseInt(radius), {
      color: 'rgb(255, 198, 0)',
      weight: 2,
    }).addTo(map);
  });
};

export const drawCircles = (map: Map, data: ObjectMapped[]): void => {
  const circles = data.filter(object => object.instanceType === 'circle');

  removeCurrentCircles();
  addCirclesToMap(map, circles);
};
