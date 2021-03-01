import { UserDto } from 'src/contracts/user';

export type User = UserDto;

export const map = (data: UserDto): User => data;
