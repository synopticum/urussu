export type ImageDto = {
  id: ImageId;
  year: string;
  url: string;
  image?: ImageDto;
};

export type ImageId = string;

export type ImagesDto = {
  [decade: number]: ImageDto[];
};

export type EntityInstanceType = 'dot' | 'object' | 'path';

export type EntityId = string;
