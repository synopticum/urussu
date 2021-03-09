import { Override } from 'src/utils/types';
import { ImagesMapped } from 'src/stores/MapStore/EntityStore';
import { DotDto } from 'src/contracts/entities/dot';

export type DotMapped = Override<DotDto, { images?: ImagesMapped }>;

export const map = (data: DotDto): DotMapped => data;
