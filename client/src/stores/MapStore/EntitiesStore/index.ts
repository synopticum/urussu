import { ImagesDto } from 'src/contracts/entities';

export type ImageMapped = {
  year: string;
  url: string;
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

  Object.entries(imagesDto).forEach(imageDto => {
    const year = imageDto[0];
    const url = imageDto[1];
    const decade = parseInt(`${year.toString().substring(0, 3)}0`);

    if (!imagesMapped[decade]) {
      imagesMapped[decade] = [];
    }

    imagesMapped[decade].push({ year, url });
  });

  return imagesMapped;
};
