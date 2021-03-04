import { LatLngExpression } from 'leaflet';

type ImagesDto = {
  [year: number]: string;
};

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
