import { ImageDto } from 'src/contracts/entities';

export type ImageMapped = ImageDto;

export type ImagesMapped = {
  [decade: number]: ImageMapped[];
};
