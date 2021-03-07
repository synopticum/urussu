import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityType } from 'src/contracts/entities';
import { color, shadow } from 'src/components/GlobalStyle/theme';
import { commentsStore } from 'src/stores/MapStore/EntitiesStore/CommentsStore';
import { authStore } from 'src/stores/AuthStore';

const StyledComments = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  padding: 20px 25px 30px 25px;
  height: calc(100vh - 170px);
  border-radius: 5px 0 0 5px;
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

const Textarea = styled.textarea``;

const Button = styled.button``;

type Props = {
  type: EntityType;
  id: EntityId;
};

export const Comments: React.FC<Props> = observer(({ type, id }) => {
  const { data } = commentsStore.apiData;
  const { token } = authStore;

  useEffect(() => {
    commentsStore.fetchApiData(type, id);

    return (): void => {
      commentsStore.resetData();
    };
  }, []);

  const addComment = (): void => {
    const data = {
      text: 'test',
    };

    commentsStore.addComment('zxczxc', token);
  };

  return (
    <StyledComments>
      <Title>Комментарии</Title>

      {!data || (!data.length && <NoComments>Никто не оставил ни одного комментария.</NoComments>)}

      <Textarea />
      <Button type="button" onClick={(): void => addComment()}>
        Submit
      </Button>
    </StyledComments>
  );
});

export default Comments;
