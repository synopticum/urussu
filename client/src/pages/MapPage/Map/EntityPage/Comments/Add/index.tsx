import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import Textarea from 'src/components/Textarea';
import Button from 'src/components/Button';

const StyledAdd = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
`;

const CommentArea = styled(Textarea)`
  margin-bottom: 10px;
`;

export const Add: React.FC = observer(() => {
  const addComment = (): Promise<void> => commentsStore.add();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => commentsStore.handleInput(e.target.value);

  return (
    <StyledAdd>
      <CommentArea onInput={handleInput} value={commentsStore.currentValue} />
      <Button onClick={addComment}>Отправить</Button>
    </StyledAdd>
  );
});
