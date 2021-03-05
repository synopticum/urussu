export type ImageDto = {
  year: string;
  url: string;
  image?: ImageDto;
};

export type ImagesDto = {
  [decade: number]: ImageDto[];
};

export type EntityId = string;
