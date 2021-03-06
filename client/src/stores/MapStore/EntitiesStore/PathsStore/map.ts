import { PathDto } from 'src/contracts/entities/path';

export type PathMapped = PathDto;

export const map = (data: PathDto[]): PathMapped[] => data;
