import { CommentDto } from 'src/contracts/entities/comments';
import { Override } from 'src/utils/types';
import { format } from 'date-fns';

export type CommentMapped = Override<CommentDto, { date?: string }>;

export const map = (data: CommentDto[]): CommentMapped[] =>
  data.map(item => {
    const date = format(new Date(item.date), "d.MM.yyyy' в 'HH:mm");
    return { ...item, date };
  });
