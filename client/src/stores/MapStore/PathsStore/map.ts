import { PathDto } from 'src/contracts/paths';

export type PathMapped = PathDto;

export const map = (data: PathDto[]): PathMapped[] => data;
