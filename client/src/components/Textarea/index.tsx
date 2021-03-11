import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/GlobalStyle/theme';

const StyledTextarea = styled.div`
  display: inline-flex;
`;

const TargetTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: ${theme.colors.black.a};
  outline: none;
  transition: border-color 0.3s, background-color 0.3s;
  border: 1px dashed ${theme.colors.white.b};

  &::placeholder {
    color: ${theme.colors.white.c};
    font-style: italic;
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:focus {
    background-color: ${theme.colors.yellow.a};

    &::placeholder {
      opacity: 0;
    }
  }

  &::selection {
    color: ${theme.colors.white.a};
    background-color: ${theme.colors.black.a};
  }

  &:disabled {
    color: ${theme.colors.white.b};
    background-image: repeating-linear-gradient(-45deg, #eaeaea, #eaeaea 11px, #fff 10px, #fff 20px);
    background-size: 28px 28px;
    animation: move 0.5s linear infinite;
    resize: none;

    &::placeholder {
      color: ${theme.colors.white.b};
    }
  }

  &:required {
    border-color: ${theme.colors.red.a};

    &::selection {
      color: ${theme.colors.white.a};
      background-color: ${theme.colors.red.a};
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
