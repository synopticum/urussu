import { DotDto } from 'src/contracts/entities/dot';

export type DotMapped = DotDto;

export const map = (data: DotDto[]): DotMapped[] => data;
