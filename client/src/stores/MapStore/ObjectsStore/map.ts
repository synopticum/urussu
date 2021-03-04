import { ObjectDto } from 'src/contracts/object';
import { ObjectMapped } from 'src/stores/MapStore/ObjectStore/map';

const shortenId = (id: string): string => id.split('-')[0];

export const map = (data: ObjectDto[]): ObjectMapped[] => data.map(item => ({ ...item, id: shortenId(item.id) }));
