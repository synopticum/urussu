import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import uploadIcon from './images/upload.svg';
import removeIcon from './images/remove.svg';
import confirmIcon from './images/confirm.svg';
import cancelIcon from './images/cancel.svg';
import Tooltip, { WithTooltip } from 'src/components/Tooltip';

type ButtonIcons = {
  [iconName: string]: {
    icon: string;
    backgroundSize?: string;
    backgroundPosition?: string;
    paddingLeft?: string;
  };
};

const buttonIcons: ButtonIcons = {
  upload: {
    icon: uploadIcon,
  },
  remove: {
    icon: removeIcon,
  },
  confirm: {
    icon: confirmIcon,
    backgroundSize: '23px',
    backgroundPosition: '5px calc(50% - 2px)',
    paddingLeft: '32px',
  },
  cancel: {
    icon: cancelIcon,
    backgroundSize: '12px',
    paddingLeft: '30px',
  },
};

type ButtonIcon = keyof typeof buttonIcons;

const ExtendedTooltip = styled(Tooltip)`
  z-index: 100;
`;

const StyledButton = styled.div`
  position: relative;
  display: inline-flex;

  ${ExtendedTooltip} {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
  }

  &:hover {
    ${ExtendedTooltip} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const TargetButton = styled.button<{ buttonType: ButtonType; icon?: string; iconName?: string | number }>`
  position: relative;
  z-index: 50;
  cursor: pointer;
  outline: 0;
  border: none;
  background: ${({ icon }): string => (icon ? `url(${icon}) no-repeat` : 'none')};
  background-position: ${({ iconName }): string => buttonIcons[iconName]?.backgroundPosition || '10px calc(50% - 1px)'};
  background-color: ${({ buttonType }): string =>
    buttonType === 'warning' ? theme.colors.red.a : theme.colors.black.a};
  background-size: ${({ iconName }): string => buttonIcons[iconName]?.backgroundSize || '20px'};
  color: ${theme.colors.white.a};
  padding: 8px 15px 9px 15px;
  padding-left: ${({ icon, iconName }): string => (icon ? buttonIcons[iconName]?.paddingLeft || '35px' : '15px')};
  font-weight: bold;
  border-radius: 5px;
  transition: opacity 0.3s, background-color 0.1s ease, color 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;

  &:hover {
    box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }

  &:active {
    box-shadow: 0 0 0 1px transparent inset;
  }

  &:focus {
    box-shadow: 0 0 5px ${theme.colors.blue.a};
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

type ButtonType = 'regular' | 'warning';

export type Props = WithTooltip & {
  onClick: () => void;
  type?: ButtonType;
  icon?: ButtonIcon;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  tooltipContent,
  tooltipDirection,
  children,
  type = 'regular',
  icon,
  disabled,
  onClick,
  className,
}) => {
  return (
    <StyledButton className={className}>
      <TargetButton
        type="button"
        buttonType={type}
        onClick={onClick}
        icon={buttonIcons[icon]?.icon}
        iconName={icon}
        disabled={disabled}
      >
        {children}
      </TargetButton>

      {tooltipContent && (
        <ExtendedTooltip isVisible direction={tooltipDirection}>
          {tooltipContent}
        </ExtendedTooltip>
      )}
    </StyledButton>
  );
};

export default Button;
