import { DotDto } from 'src/contracts/entities/dot';
import { ObjectDto } from 'src/contracts/entities/object';
import { PathDto } from 'src/contracts/entities/path';

type ResultItemDto = ObjectDto | PathDto | DotDto;

export type SearchResultDto = ResultItemDto[];
