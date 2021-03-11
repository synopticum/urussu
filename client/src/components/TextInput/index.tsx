import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledTextInput = styled.div``;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: ${theme.colors.black.a};
  outline: none;
  transition: border-color 0.3s, background-color 0.3s;
  border: 1px dashed ${theme.colors.white.b};
  background-color: ${theme.colors.white.a};

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

    &::placeholder {
      color: ${theme.colors.white.b};
    }
  }

  &:required {
    border-color: ${theme.colors.red.a};

    &::selection {
      color: ${theme.colors.white.a};
      background-color: ${theme.colors.black.a};
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
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

const TextInput: React.FC<Props> = ({ value, placeholder, disabled, required }) => {
  return (
    <StyledTextInput>
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        required={required}
      />
    </StyledTextInput>
  );
};

export default TextInput;
