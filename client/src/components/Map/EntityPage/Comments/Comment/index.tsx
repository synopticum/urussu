import React from 'react';
import { CommentMapped } from 'src/stores/MapStore/EntitiesStore/CommentsStore/map';
import styled from 'styled-components';

type Props = {
  item: CommentMapped;
};

const StyledComment = styled.div`
  margin: 10px 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Meta = styled.div`
  font-size: 12px;
  text-align: right;
`;

const Comment: React.FC<Props> = ({ item }) => {
  return (
    <StyledComment>
      <div>{item.text}</div>
      <Meta>
        <a href={`https://vk.com/id${item.authorVkId}`} target="_blank" rel="noreferrer">
          {item.author}
        </a>{' '}
        написал {item.date}
      </Meta>
    </StyledComment>
  );
};

export default Comment;
