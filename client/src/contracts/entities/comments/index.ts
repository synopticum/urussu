import { EntityId, EntityType } from 'src/contracts/entities';

export type CommentDto = {
  id: string;
  originType: EntityType;
  originId: EntityId;
  text: string;
  date: string;
  author: string;
  authorId: string;
  authorVkId: string;
};

export type CommentsDto = CommentDto[];
