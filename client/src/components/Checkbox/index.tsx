import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import checkIcon from './images/check.svg';
import { v4 as uuidv4 } from 'uuid';

const StyledCheckbox = styled.div`
  position: relative;
  display: inline-flex;
`;

const Label = styled.label`
  position: relative;
  padding: 0 0 0 25px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1px;
    width: 20px;
    height: 20px;
    border: 2px solid ${theme.colors.black.a};
    border-radius: 3px;
  }

  &:hover {
    color: #000000;
  }

  &:active {
    color: #000000;
  }

  &:focus {
    color: #000000;
  }

  &:disabled {
    color: #000000;
  }
`;

const NativeCheckbox = styled.input`
  display: none;

  &:checked ~ label {
    &::before {
      background: url(${checkIcon}) no-repeat 50% 50%;
      background-size: 14px;
    }
  }
`;

export type Props = {
  onChange: () => void;
  disabled?: boolean;
};

const Checkbox: React.FC<Props> = ({ children, disabled, onChange }) => {
  const checkboxId = uuidv4();

  return (
    <StyledCheckbox>
      <NativeCheckbox id={checkboxId} type="checkbox" onChange={onChange} disabled={disabled} />
      <Label htmlFor={checkboxId}>{children}</Label>
    </StyledCheckbox>
  );
};

export default Checkbox;
