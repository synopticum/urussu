import { ObjectDto } from 'src/contracts/object';

export type ObjectMapped = ObjectDto;

export const map = (data: ObjectDto): ObjectMapped => data;
