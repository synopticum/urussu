import { LatLngExpression } from 'leaflet';
import { EntityId, EntityInstanceType, ImagesDto } from 'src/contracts/entities';

export type PathDto = {
  id: EntityId;
  instanceType: EntityInstanceType;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
};
