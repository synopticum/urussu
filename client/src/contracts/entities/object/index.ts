import { LatLngExpression } from 'leaflet';
import { ImagesDto } from 'src/contracts/entities';

export type ObjectDto = {
  id: string;
  instanceType: string;
  type: string;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: ImagesDto;
  street?: string;
  house?: string;
  radius?: string;
};
