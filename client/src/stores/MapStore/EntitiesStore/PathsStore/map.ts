import { PathDto } from 'src/contracts/entities/paths';

export type PathMapped = PathDto;

export const map = (data: PathDto[]): PathMapped[] => data;
