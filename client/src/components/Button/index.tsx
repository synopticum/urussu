import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledButton = styled.div`
  position: relative;
  display: inline-flex;
`;

const TargetButton = styled.button<{ icon?: string }>`
  cursor: pointer;
  outline: 0;
  border: none;
  background: ${({ icon }): string =>
    icon ? `url(${icon}) no-repeat 10px calc(50% - 1px) ${theme.colors.black.a}` : theme.colors.black.a};
  background-size: 20px;
  color: ${theme.colors.white.a};
  padding: 8px 15px 9px 15px;
  padding-left: ${({ icon }): string => (icon ? '35px' : '15px')};
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  transition: opacity 0.3s, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;

  &:hover {
    background-color: ${theme.colors.black.a};
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }

  &:active {
    background-color: ${theme.colors.black.a};
    box-shadow: 0 0 0 1px transparent inset;
  }

  &:focus {
    background-color: ${theme.colors.black.b};
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

export type Props = {
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, icon, disabled, onClick }) => {
  return (
    <StyledButton>
      <TargetButton type="button" onClick={onClick} icon={icon} disabled={disabled}>
        {children}
      </TargetButton>
    </StyledButton>
  );
};

export default Button;
