import { ImagesDto } from 'src/contracts/entities';

export type Image = {
  [year: number]: string;
};

export type ImagesMapped = {
  [decade: number]: Image[];
};

export type EntityId = string;

const createImagesMapped = (): ImagesMapped => {
  const decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const imagesMapped: ImagesMapped = {};

  decades.forEach(decade => (imagesMapped[decade] = []));

  return imagesMapped;
};

export const mapImages = (images: ImagesDto): ImagesMapped => {
  if (!images) {
    return null;
  }

  const imagesMapped = createImagesMapped();

  Object.entries(images).forEach(image => {
    const year = image[0];
    const decade = parseInt(`${year.substring(0, 3)}0`);

    imagesMapped[decade].push(image);
  });

  return imagesMapped;
};
