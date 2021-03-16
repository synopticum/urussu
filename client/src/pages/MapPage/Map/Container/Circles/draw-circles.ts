import { circle, Map } from 'leaflet';
import { getClassName, removeCurrentEntities } from 'src/pages/MapPage/Map/Container';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { mapStore } from 'src/stores/MapStore';

const addCirclesToMap = (map: Map, circles: ObjectMapped[]): void => {
  const setEntity = (id: string): void => {
    mapStore.setEntity({ type: 'object', id });
  };

  circles.forEach(item => {
    const { coordinates, radius } = item;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    circle(coordinates[0], parseInt(radius), {
      color: 'rgb(255, 198, 0)',
      weight: 2,
      className: getClassName(item),
      radius,
    })
      .on('click', () => setEntity(item.id))
      .addTo(map);
  });
};

export const drawCircles = (map: Map, data: ObjectMapped[]): void => {
  const circles = data.filter(object => object.instanceType === 'object' && object.type === 'circle');

  removeCurrentEntities(map, 'circles');
  addCirclesToMap(map, circles);
};
