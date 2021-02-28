import { LatLngExpression } from 'leaflet';

export type PathDto = {
  id: string;
  instanceType: string;
  type: string;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: object;
};
