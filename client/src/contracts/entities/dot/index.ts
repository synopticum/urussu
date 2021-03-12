import { LatLngTuple } from 'leaflet';
import { EntityId, EntityInstanceType, ImagesDto } from 'src/contracts/entities';

export type DotDto = {
  id: EntityId;
  instanceType: EntityInstanceType;
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
