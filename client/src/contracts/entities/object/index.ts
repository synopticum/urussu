import { LatLngExpression, LatLngTuple } from 'leaflet';
import { ImagesDto } from 'src/contracts/entities';

export type ObjectDto = {
  id: string;
  instanceType: 'dot' | 'object' | 'path' | 'circle';
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
