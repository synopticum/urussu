import { DotDto } from 'src/contracts/entities/dot';
import { ObjectDto } from 'src/contracts/entities/object';
import { PathDto } from 'src/contracts/entities/path';

type Result = ObjectDto | PathDto | DotDto;

export type SearchResultDto = Result[];
