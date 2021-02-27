export type DotDto = {
  id: string;
  instanceType: string;
  layer: string;
  coordinates: number[][];
  authorId: string;
  rotationAngle: number;
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  thumbnail?: string;
  images?: object;
};
