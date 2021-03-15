import { circle, Map } from 'leaflet';
import { getClassName } from 'src/pages/MapPage/Map/Container';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { mapStore } from 'src/stores/MapStore';

const removeCurrentCircles = (map: Map): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const _layers = map._layers;
  // const layers = Object.entries(_layers);
  //
  // for (const layer of layers) {
  //   const [id] = layer;
  //   const _layer = _layers[id];
  //
  //   if (_layer._path !== undefined) {
  //     try {
  //       map.removeLayer(_layer);
  //     } catch (e) {
  //       console.log('Problem with ' + e + _layer);
  //     }
  //   }
  // }
};

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
    })
      .on('click', () => setEntity(item.id))
      .addTo(map);
  });
};

export const drawCircles = (map: Map, data: ObjectMapped[]): void => {
  const circles = data.filter(object => object.instanceType === 'object' && object.type === 'circle');

  removeCurrentCircles(map);
  addCirclesToMap(map, circles);
};
