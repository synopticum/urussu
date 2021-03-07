import { LatLngExpression } from 'leaflet';
import { EntityId, EntityType, ImagesDto } from 'src/contracts/entities';

export type PathDto = {
  id: EntityId;
  instanceType: EntityType;
  type: string;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
};
