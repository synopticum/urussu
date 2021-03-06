import { Override } from 'src/utils/types';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { PathDto } from 'src/contracts/entities/path';

export type PathMapped = Override<PathDto, { images?: ImagesMapped }>;

export const map = (data: PathDto): PathMapped => data;
