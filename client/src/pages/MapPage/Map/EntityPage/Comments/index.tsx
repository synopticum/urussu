import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import Comment from './Comment';
import { Add } from 'src/pages/MapPage/Map/EntityPage/Comments/Add';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledComments = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  padding: 20px 10px 20px 25px;
  height: calc(100vh - 170px);
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  background: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.b};

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${theme.colors.white.a};
  }
`;

const Title = styled.h1`
  font-size: 24px;
`;

const NoComments = styled.div`
  margin: 15px 0;
`;

const List = styled.div`
  flex: 1 1 auto;
  height: 0;
  margin: 20px 0;
  padding-right: 10px;
  overflow-y: auto;
  ${theme.chunks.scrollbar(theme.colors.black.a, theme.colors.white.a)}
`;

type Props = {
  entityType: EntityInstanceType;
  entityId: EntityId;
  imageId?: ImageId;
};

export const Comments: React.FC<Props> = observer(({ entityType, entityId, imageId }) => {
  const { data } = commentsStore.apiData;

  useEffect(() => {
    commentsStore.fetchApiData(entityType, entityId, imageId);

    return (): void => {
      commentsStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledComments>
      <Title>Комментарии</Title>

      {!data.length && <NoComments>Никто не оставил ни одного комментария.</NoComments>}

      <List>
        {data.map(item => (
          <Comment item={item} key={item.id} />
        ))}
      </List>

      <Add />
    </StyledComments>
  );
});

export default Comments;
