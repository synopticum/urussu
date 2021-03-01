import { ObjectDto } from 'src/contracts/objects';

export type ObjectItem = ObjectDto;

export const map = (data: ObjectDto[]): ObjectItem[] => data;
