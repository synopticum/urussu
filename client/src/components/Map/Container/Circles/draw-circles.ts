import { circle, Map } from 'leaflet';
import { getClassName } from 'src/components/Map/Container';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { controlsStore } from 'src/stores/ControlsStore';
import { mapStore } from 'src/stores/MapStore';

const removeCurrentCircles = (): void => {};

const addCirclesToMap = (map: Map, circles: ObjectMapped[]): void => {
  const handleClick = (id: string): void => {
    controlsStore.selected = null;
    mapStore.setEntity({ type: 'object', id });
  };

  circles.forEach(item => {
    const { coordinates, radius } = item;

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    circle(coordinates[0], parseInt(radius), {
      color: 'rgb(255, 198, 0)',
      weight: 2,
      className: getClassName(item),
    })
      .on('click', () => handleClick(item.id))
      .addTo(map);
  });
};

export const drawCircles = (map: Map, data: ObjectMapped[]): void => {
  const circles = data.filter(object => object.instanceType === 'circle');

  removeCurrentCircles();
  addCirclesToMap(map, circles);
};
