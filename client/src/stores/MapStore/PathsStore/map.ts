import { PathDto } from 'src/contracts/entities/path';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';

export const map = (data: PathDto[]): PathMapped[] => data;
