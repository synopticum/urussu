import { ObjectDto } from 'src/contracts/entities/object';
import { Override } from 'src/utils/types';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';

export type ObjectMapped = Override<ObjectDto, { images?: ImagesMapped }>;

export const map = (data: ObjectDto): ObjectMapped => data;
