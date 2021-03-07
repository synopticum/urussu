import { CommentDto } from 'src/contracts/entities/comments';

export type CommentMapped = CommentDto;

export const map = (data: CommentDto[]): CommentMapped[] => data;
