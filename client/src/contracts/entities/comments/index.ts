import { EntityId, EntityType, ImageId } from 'src/contracts/entities';

export type CommentDto = {
  id: string;
  date: string;
  originType: EntityType;
  originId: EntityId;
  imageId?: ImageId;
  text: string;
  author: string;
  authorId: string;
  authorVkId: number;
};

export type CommentsDto = CommentDto[];
