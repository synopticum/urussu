import { ImagesDto } from 'src/contracts/entities';

export type ImageMapped = {
  [year: number]: string;
};

export type ImagesMapped = {
  [decade: number]: ImageMapped[];
};

export type EntityId = string;

export const mapImages = (imagesDto: ImagesDto): ImagesMapped => {
  if (!imagesDto) {
    return null;
  }

  const imagesMapped: ImagesMapped = {};

  Object.entries(imagesDto).forEach(image => {
    const year = image[0];
    const decade = parseInt(`${year.substring(0, 3)}0`);

    if (!imagesMapped[decade]) {
      imagesMapped[decade] = [];
    }

    imagesMapped[decade].push(image);
  });

  return imagesMapped;
};
