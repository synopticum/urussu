import { ObjectDto } from 'src/contracts/object';
import { polygon, Map } from 'leaflet';
import { mapStore } from 'src/stores';

const removeCurrentObjects = (): void => {};

const getObjectColor = (object: ObjectDto): string => {
  if (object.street && object.house) {
    return '#ffc600';
  } else if (object.street === '' && object.house === '') {
    return '#00f';
  }

  return '#f00';
};

const getClassName = (item: ObjectDto): string => {
  const hasImages = item.images ? 'leaflet-interactive--has-images' : '';
  return `${hasImages}`;
};

const addObjectsToMap = (map: Map, objects: ObjectDto[]): void => {
  objects.forEach((item: ObjectDto) => {
    polygon(item.coordinates, {
      color: getObjectColor(item),
      className: getClassName(item),
      weight: 2,
    })
      .on('click', e => {
        const id = item.id;
        mapStore.setEntity({ type: 'object', id });
      })
      .addTo(map);
  });
};

export const drawObjects = (map: Map, data: ObjectDto[]): void => {
  const objects = data.filter(object => object.instanceType === 'object');

  removeCurrentObjects();
  addObjectsToMap(map, objects);
};
