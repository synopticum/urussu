import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import uploadIcon from './images/upload.svg';
import removeIcon from './images/remove.svg';
import Tooltip, { TooltipDirection } from 'src/components/Tooltip';

const ExtendedTooltip = styled(Tooltip)`
  z-index: 100;
`;

const StyledButton = styled.div`
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
    }
  }
`;

const TargetButton = styled.button<{ buttonType: ButtonType; icon?: string }>`
  position: relative;
  z-index: 50;
  cursor: pointer;
  outline: 0;
  border: none;
  background: ${({ icon }): string => (icon ? `url(${icon}) no-repeat 10px calc(50% - 1px)` : 'none')};
  background-color: ${({ buttonType }): string =>
    buttonType === 'warning' ? theme.colors.red.a : theme.colors.black.a};
  background-size: 20px;
  color: ${theme.colors.white.a};
  padding: 8px 15px 9px 15px;
  padding-left: ${({ icon }): string => (icon ? '35px' : '15px')};
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  transition: opacity 0.3s, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;

  &:hover {
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }

  &:active {
    box-shadow: 0 0 0 1px transparent inset;
  }

  &:focus {
    opacity: 0.75;
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

const ButtonIcons = {
  upload: uploadIcon,
  remove: removeIcon,
};

type ButtonIcon = keyof typeof ButtonIcons;

type ButtonType = 'regular' | 'warning';

export type Props = {
  onClick: () => void;
  type?: ButtonType;
  icon?: ButtonIcon;
  disabled?: boolean;
  tooltipContent?: React.ReactElement;
  tooltipDirection?: TooltipDirection;
};

const Button: React.FC<Props> = ({
  tooltipContent,
  tooltipDirection,
  children,
  type = 'regular',
  icon,
  disabled,
  onClick,
}) => {
  const isTooltipVisible = Boolean(tooltipContent);

  return (
    <StyledButton>
      <TargetButton type="button" buttonType={type} onClick={onClick} icon={ButtonIcons[icon]} disabled={disabled}>
        {children}
      </TargetButton>

      {tooltipContent && (
        <ExtendedTooltip isVisible={isTooltipVisible} direction={tooltipDirection}>
          {tooltipContent}
        </ExtendedTooltip>
      )}
    </StyledButton>
  );
};

export default Button;
