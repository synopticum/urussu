import { Map, polygon } from 'leaflet';
import { getClassName, removeCurrentEntities } from 'src/pages/MapPage/Map/Container';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { mapStore } from 'src/stores/MapStore';

const getObjectColor = (object: ObjectMapped): string => {
  if (object.street && object.house) {
    return '#ffc600';
  } else if (object.street === '' && object.house === '') {
    return '#00f';
  }

  return '#f00';
};

const addObjectsToMap = (map: Map, objects: ObjectMapped[]): void => {
  const setEntity = (id: string): void => {
    mapStore.setEntity({ type: 'object', id });
  };

  objects.forEach((item: ObjectMapped) => {
    polygon(item.coordinates, {
      color: getObjectColor(item),
      className: getClassName(item),
      weight: 2,
    })
      .on('click', () => setEntity(item.id))
      .addTo(map);
  });
};

export const drawObjects = (map: Map, data: ObjectMapped[]): void => {
  const objects = data.filter(object => object.instanceType === 'object');

  removeCurrentEntities(map, 'objects');
  addObjectsToMap(map, objects);
};
