import { SearchResultDto } from 'src/contracts/search';

export type SearchResultMapped = SearchResultDto;

export const map = (data: SearchResultDto[]): SearchResultMapped[] => data;
