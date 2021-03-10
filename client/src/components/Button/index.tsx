import React from 'react';
import styled from 'styled-components';
import { color } from 'src/features/GlobalStyle/theme/helpers';

const StyledButton = styled.div`
  display: inline-flex;
`;

const TargetButton = styled.button`
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
