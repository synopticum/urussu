import { EntityId, EntityType } from 'src/contracts/entities';

export type CommentDto = {
  id: string;
  date: Date;
  originType: EntityType;
  originId: EntityId;
  text: string;
  author: string;
  authorId: string;
  authorVkId: number;
};

export type CommentsDto = CommentDto[];
