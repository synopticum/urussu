import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import checkIcon from './images/check.svg';
import { v4 as uuidv4 } from 'uuid';
import Tooltip, { WithTooltip } from 'src/components/Tooltip';

const ExtendedTooltip = styled(Tooltip)`
  z-index: 100;
`;

const StyledCheckbox = styled.div`
  position: relative;
  display: inline-flex;

  ${ExtendedTooltip} {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &:hover {
    ${ExtendedTooltip} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const Label = styled.label`
  position: relative;
  padding: 1px 0 0 25px;
  min-height: 20px;
  font-size: 14px;
  transition: opacity 0.3s;

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
`;

const NativeCheckbox = styled.input`
  display: none;

  &:checked ~ label {
    &::before {
      background: url(${checkIcon}) no-repeat 50% 50%;
      background-size: 14px;
    }
  }

  &:disabled ~ label {
    opacity: 0.3;
  }
`;

export type Props = WithTooltip & {
  onChange: () => void;
  checked?: boolean;
  disabled?: boolean;
};

const Checkbox: React.FC<Props> = ({ children, checked, disabled, onChange, tooltipContent, tooltipDirection }) => {
  const checkboxId = uuidv4();

  return (
    <StyledCheckbox>
      <NativeCheckbox id={checkboxId} type="checkbox" onChange={onChange} checked={checked} disabled={disabled} />
      <Label htmlFor={checkboxId}>{children}</Label>

      {tooltipContent && (
        <ExtendedTooltip isVisible direction={tooltipDirection}>
          {tooltipContent}
        </ExtendedTooltip>
      )}
    </StyledCheckbox>
  );
};

export default Checkbox;
