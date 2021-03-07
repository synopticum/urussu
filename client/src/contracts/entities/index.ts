export type ImageDto = {
  year: string;
  url: string;
  image?: ImageDto;
};

export type ImagesDto = {
  [decade: number]: ImageDto[];
};

export type EntityType = 'dot' | 'object' | 'path' | 'circle';

export type EntityId = string;
