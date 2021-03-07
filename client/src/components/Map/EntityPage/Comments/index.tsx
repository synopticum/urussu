import React, { useEffect } from 'react';
import styled from 'styled-components';
import { commentsStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityType } from 'src/contracts/entities';
import { color, shadow } from 'src/components/GlobalStyle/theme';

const StyledComments = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  padding: 10px 10px 20px 15px;
  height: calc(100vh - 170px);
  border-radius: 5px 0 0 5px;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  background: ${color('white-1')};
  box-shadow: ${shadow('shadow-1')};

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

type Props = {
  type: EntityType;
  id: EntityId;
};

export const Comments: React.FC<Props> = observer(({ type, id }) => {
  const { data } = commentsStore.apiData;

  useEffect(() => {
    commentsStore.fetchApiData(type, id);

    return (): void => {
      commentsStore.resetData();
    };
  }, []);

  if (!data) {
    return <StyledComments>No comments found</StyledComments>;
  }

  return <StyledComments>{JSON.stringify(data)}</StyledComments>;
});

export default Comments;
