import { PathDto } from 'src/contracts/paths';

export type PathItem = PathDto;

export const map = (data: PathDto[]): PathItem[] => data;
