import { UserDto } from 'src/contracts/user';

export type UserMapped = UserDto;

export const map = (data: UserDto): UserMapped => data;
