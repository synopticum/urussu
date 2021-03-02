import { DotDto } from 'src/contracts/dots';

export type DotMapped = DotDto;

export const map = (data: DotDto[]): DotMapped[] => data;
