import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { EntityId, mapImages } from 'src/stores/MapStore/EntitiesStore';

const shortenId = (id: EntityId): EntityId => id.split('-')[0];

export const map = (data: ObjectDto[]): ObjectMapped[] =>
  data.map(item => ({ ...item, id: shortenId(item.id), images: mapImages(item.images) }));
