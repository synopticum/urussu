import { DotDto } from 'src/contracts/entities/dots';

export type DotMapped = DotDto;

export const map = (data: DotDto[]): DotMapped[] => data;
