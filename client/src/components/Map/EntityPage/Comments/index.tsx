import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityType, ImageId } from 'src/contracts/entities';
import { commentsStore } from 'src/stores/MapStore/EntitiesStore/CommentsStore';
import Comment from './Comment';
import { color, scrollbar, shadow } from 'src/components/GlobalStyle/theme/helpers';
import { Add } from 'src/components/Map/EntityPage/Comments/Add';

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
  background: ${color('white-1')};
  box-shadow: ${shadow('shadow-2')};

  &::before {
    display: none;
    content: '';
    position: absolute;
    left: -10px;
    top: 17px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
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
  ${scrollbar(color('black-1'), color('white-1'))}
`;

type Props = {
  entityType: EntityType;
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
