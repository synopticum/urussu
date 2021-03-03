import { LatLngExpression } from 'leaflet';

export type ObjectDto = {
  id: string;
  instanceType: string;
  type: string;
  coordinates: LatLngExpression[];
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: object;
  street?: string;
  house?: string;
  radius?: string;
};
