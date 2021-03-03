import { ObjectDto } from 'src/contracts/object';
import { ObjectMapped } from 'src/stores/MapStore/ObjectStore/map';

export const map = (data: ObjectDto[]): ObjectMapped[] => data;
