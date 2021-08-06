import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import Comment from './Comment';
import { Add } from 'src/pages/MapPage/Map/EntityPage/Comments/Add';
import theme from 'src/features/App/GlobalStyle/theme';
import { authStore } from 'src/stores/AuthStore';

const StyledComments = styled.div<{ isReady: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px 10px 20px 88px;
  height: calc(100vh - 125px);
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.b};
  opacity: ${({ isReady }): string => (isReady ? '1' : '0')};
  transition: opacity 0.3s;
  width: 100%;

  @media only screen and (min-width: 1000px) {
    width: 463px;
    border-bottom: 0;
    padding-left: 75px;
  }

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

const NotAuthorizedMessage = styled.div``;

type Props = {
  entityType: EntityInstanceType;
  entityId: EntityId;
  imageId?: ImageId;
};

export const Comments: React.FC<Props> = observer(({ entityType, entityId, imageId }) => {
  const { data } = commentsStore.apiData;

  useEffect(() => {
    commentsStore.fetchApiData(entityType, entityId, imageId);
    const delay = 150;

    setTimeout(() => {
      commentsStore.isReady = true;
    }, delay);

    return (): void => {
      commentsStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledComments isReady={commentsStore.isReady}>
      <Title>Комментарии</Title>

      {!data.length && <NoComments>Никто не оставил ни одного комментария.</NoComments>}

      <List>
        {data.map(item => (
          <Comment item={item} key={item.id} />
        ))}
      </List>

      {authStore.isLogged ? (
        <Add />
      ) : (
        <NotAuthorizedMessage>Войдите на сайт через Вконтакте, чтобы оставлять комментарии.</NotAuthorizedMessage>
      )}
    </StyledComments>
  );
});

export default Comments;
