import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { commentsStore } from 'src/stores/MapStore/EntityStore/CommentsStore';
import { color } from 'src/features/GlobalStyle/theme/helpers';

const StyledAdd = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 10px);
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 80px;
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid ${color('white-2')};
  border-radius: 5px;

  &:focus {
    background-color: ${color('yellow-1')};
  }
`;

const Submit = styled.button`
  display: inline-flex;
  margin-left: auto;
  cursor: pointer;
  outline: 0;
  border: none;
  background: ${color('black-1')};
  color: ${color('white-1')};
  padding: 8px 15px 9px 15px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;

  &:hover {
    background-color: ${color('black-1')};
    background-image: none;
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }

  &:active {
    background-color: ${color('black-2')};
    box-shadow: 0 0 0 1px transparent inset;
  }

  &:focus {
    background-color: ${color('black-2')};
  }
`;

export const Add: React.FC = observer(() => {
  const addComment = (): Promise<void> => commentsStore.add();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => commentsStore.handleInput(e.target.value);

  return (
    <StyledAdd>
      <Textarea onInput={handleInput} value={commentsStore.currentValue} />

      <Submit type="button" onClick={addComment}>
        Отправить
      </Submit>
    </StyledAdd>
  );
});
