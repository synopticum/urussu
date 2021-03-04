import { ObjectDto } from 'src/contracts/object';
import { Override } from 'src/utils/types';

export type ImagesMapped = {
  [year: number]: string;
};

export type ObjectMapped = Override<ObjectDto, { images?: ImagesMapped }>;

export const map = (data: ObjectDto): ObjectMapped => data;
