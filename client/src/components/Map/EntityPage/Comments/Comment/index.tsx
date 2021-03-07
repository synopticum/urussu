import React from 'react';
import { CommentMapped } from 'src/stores/MapStore/EntitiesStore/CommentsStore/map';

type Props = {
  item: CommentMapped;
};

const Comment: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <div>{item.text}</div>
      <div>
        by {item.author} at {item.date}
      </div>
    </div>
  );
};

export default Comment;
