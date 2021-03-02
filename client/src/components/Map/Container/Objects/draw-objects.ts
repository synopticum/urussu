import { ObjectDto } from 'src/contracts/objects';
import { polygon, Map } from 'leaflet';

const removeCurrentObjects = (): void => {};

const getObjectColor = (object: ObjectDto): string => {
  if (object.street && object.house) {
    return '#ffc600';
  } else if (object.street === '' && object.house === '') {
    return '#00f';
  }

  return '#f00';
};

const addObjectsToMap = (map: Map, objects: ObjectDto[]): void => {
  objects.forEach((item: ObjectDto) => {
    polygon(item.coordinates, {
      color: getObjectColor(item),
      weight: 2,
      className: item.images ? 'leaflet-interactive--has-images' : '',
    }).addTo(map);
  });
};

export const drawObjects = (map: Map, data: ObjectDto[]): void => {
  const objects = data.filter(object => object.instanceType === 'object');

  removeCurrentObjects();
  addObjectsToMap(map, objects);
};
