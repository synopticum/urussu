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

export type EntityType = 'dot' | 'object' | 'path' | 'circle';

export type EntityId = string;
