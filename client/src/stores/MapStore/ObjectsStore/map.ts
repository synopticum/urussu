import { ObjectDto } from 'src/contracts/objects';

export type ObjectMapped = ObjectDto;

export const map = (data: ObjectDto[]): ObjectMapped[] => data;
