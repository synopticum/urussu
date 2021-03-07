import { SearchResultDto } from 'src/contracts/search';
import { ObjectDto } from 'src/contracts/entities/object';
import { DotDto } from 'src/contracts/entities/dot';
import { PathDto } from 'src/contracts/entities/path';

export type ResultItemMapped = ObjectDto | PathDto | DotDto;

export type SearchResultMapped = ResultItemMapped[];

export const map = (data: SearchResultDto): SearchResultMapped => data;
