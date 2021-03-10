import React from 'react';
import styled from 'styled-components';
import { color } from 'src/features/GlobalStyle/theme/helpers';

const StyledTextarea = styled.div`
  display: inline-flex;
`;

const TargetTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: ${color('black-1')};
  outline: none;
  transition: border-color 0.3s, background-color 0.3s;
  border: 1px dashed ${color('white-2')};
  background-color: ${color('white-1')};

  &::placeholder {
    color: ${color('white-3')};
    font-style: italic;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:focus {
    background-color: ${color('yellow-1')};

    &::placeholder {
      opacity: 0;
    }
  }

  &::selection {
    color: ${color('white-1')};
    background-color: ${color('black-1')};
  }

  &:disabled {
    color: ${color('white-2')};
    background-image: repeating-linear-gradient(-45deg, #eaeaea, #eaeaea 11px, #fff 10px, #fff 20px);
    background-size: 28px 28px;
    animation: move 0.5s linear infinite;
    resize: none;

    &::placeholder {
      color: ${color('white-2')};
    }
  }

  &:required {
    border-color: ${color('red-1')};

    &::selection {
      color: ${color('white-1')};
      background-color: ${color('red-1')};
    }
  }

  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 28px 0;
    }
  }
`;

export type Props = {
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

const Textarea: React.FC<Props> = props => {
  return (
    <StyledTextarea>
      <TargetTextarea {...props} />
    </StyledTextarea>
  );
};

export default Textarea;
