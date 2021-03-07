import { LatLngTuple } from 'leaflet';
import { EntityId, EntityType, ImagesDto } from 'src/contracts/entities';

export type DotDto = {
  id: EntityId;
  instanceType: EntityType;
  layer: string;
  coordinates: LatLngTuple;
  authorId: string;
  rotationAngle: number;
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
};
