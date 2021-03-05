export type ImageDto = {
  year: string;
  url: string;
};

export type ImagesDto = {
  [decade: number]: ImageDto[];
};

export type EntityId = string;
