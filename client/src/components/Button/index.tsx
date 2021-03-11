import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledButton = styled.div`
  display: inline-flex;
`;

const TargetButton = styled.button`
  cursor: pointer;
  outline: 0;
  border: none;
  background: ${theme.colors.black.a};
  color: ${theme.colors.white.a};
  padding: 8px 15px 9px 15px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;

  &:hover {
    background-color: ${theme.colors.black.a};
    background-image: none;
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }

  &:active {
    background-color: ${theme.colors.black.b};
    box-shadow: 0 0 0 1px transparent inset;
  }

  &:focus {
    background-color: ${theme.colors.black.b};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, disabled, onClick }) => {
  return (
    <StyledButton>
      <TargetButton type="button" onClick={onClick} disabled={disabled}>
        {children}
      </TargetButton>
    </StyledButton>
  );
};

export default Button;
