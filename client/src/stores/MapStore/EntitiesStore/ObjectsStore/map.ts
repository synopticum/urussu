import { ObjectDto } from 'src/contracts/entities/object';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';

export const map = (data: ObjectDto[]): ObjectMapped[] => data;
