import { LatLngTuple } from 'leaflet';
import { EntityId, EntityInstanceType, ImagesDto } from 'src/contracts/entities';

export type ObjectType = 'object' | 'circle';

export type ObjectDto = {
  id: EntityId;
  instanceType: EntityInstanceType;
  type: ObjectType;
  coordinates: LatLngTuple[][];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
  street?: string;
  house?: string;
  radius?: number;
};
