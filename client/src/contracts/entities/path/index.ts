import { LatLngExpression } from 'leaflet';
import { ImagesDto } from 'src/contracts/entities';

export type PathDto = {
  id: string;
  instanceType: 'dot' | 'object' | 'path' | 'circle';
  type: string;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
};
