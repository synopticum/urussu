import { DotDto } from 'src/contracts/dots';

export type DotItem = DotDto;

export const map = (data: DotDto[]): DotItem[] => data;
