import React from 'react';
import { CommentMapped } from 'src/stores/MapStore/EntityStore/CommentsStore/map';
import styled from 'styled-components';
import theme from 'src/features/GlobalStyle/theme';

type Props = {
  item: CommentMapped;
};

const StyledComment = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.white.b};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

const Meta = styled.div`
  margin-top: 10px;
  font-size: 12px;
  text-align: right;
`;

const Comment: React.FC<Props> = ({ item }) => {
  return (
    <StyledComment>
      <div>{item.text}</div>
      <Meta>
        Написал
        <a href={`https://vk.com/id${item.authorVkId}`} target="_blank" rel="noreferrer">
          {item.author}
        </a>{' '}
        {item.date}
      </Meta>
    </StyledComment>
  );
};

export default Comment;
