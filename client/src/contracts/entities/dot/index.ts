import { LatLngTuple } from 'leaflet';
import { ImagesDto } from 'src/contracts/entities';

export type DotDto = {
  id: string;
  instanceType: 'dot' | 'object' | 'path' | 'circle';
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
