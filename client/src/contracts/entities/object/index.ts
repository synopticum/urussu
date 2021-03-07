import { LatLngExpression, LatLngTuple } from 'leaflet';
import { EntityId, EntityType, ImagesDto } from 'src/contracts/entities';

export type ObjectDto = {
  id: EntityId;
  instanceType: EntityType;
  type: string;
  coordinates: LatLngTuple[][];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
  street?: string;
  house?: string;
  radius?: string;
};
