import React from 'react';
import styled from 'styled-components';
import theme, { CSSChunk } from 'src/features/App/GlobalStyle/theme';

const getTooltipPosition = (direction: TooltipDirection): CSSChunk => {
  const margin = '10px';
  const positions = {
    top: `
      left: 50%;
      transform: translate(-50%,0);
      bottom: calc(100% + ${margin});
    `,
    right: `
      left: calc(100% + ${margin});
      transform: translate(0,-50%);
      top: 50%;
    `,
    bottom: `
      left: 50%;
      transform: translate(-50%,0);
      top: calc(100% + ${margin});
    `,
    left: `
      right: calc(100% + ${margin});
      transform: translate(0,-50%);
      top: 50%;
    `,
  };

  return positions[direction];
};

const getArrowPosition = (direction: TooltipDirection): CSSChunk => {
  const size = '7px';
  const color = theme.colors.white.a;

  const directions = {
    top: `
      left: calc(50% - ${size});
      top: 100%;
      border-top: ${size} solid ${color};
      border-right: ${size} solid transparent;
      border-left: ${size} solid transparent;
    `,
    right: `
      top: calc(50% - ${size});
      right: 100%;
      border-top: ${size} solid transparent;
      border-right: ${size} solid ${color};
      border-bottom: ${size} solid transparent;
    `,
    bottom: `
      left: calc(50% - ${size});
      bottom: 100%;
      border-right: ${size} solid transparent;
      border-bottom: ${size} solid ${color};
      border-left: ${size} solid transparent;
    `,
    left: `
      top: calc(50% - ${size});
      left: 100%;
      border-top: ${size} solid transparent;
      border-bottom: ${size} solid transparent;
      border-left: ${size} solid ${color};
    `,
  };

  return directions[direction];
};

type StyledTooltipProps = Props;

const StyledTooltip = styled.div<StyledTooltipProps>`
  opacity: ${({ isVisible }): string => (isVisible ? '1' : '0')};
  pointer-events: ${({ isVisible }): string => (isVisible ? 'auto' : 'none')};
  position: absolute;
  ${({ direction }): CSSChunk => getTooltipPosition(direction)}
  background-color: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.c};
  border-radius: 5px;
  padding: 8px 15px;
  transition: opacity 0.15s;
  font-size: 12px;

  &::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;

    ${({ direction }): CSSChunk => getArrowPosition(direction)}
  }
`;

const Wrapper = styled.div``;

export type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export type WithTooltip = {
  tooltipContent?: React.ReactElement;
  tooltipDirection?: TooltipDirection;
};

export type Props = {
  isVisible: boolean;
  direction: TooltipDirection;
  className?: string;
};

const Tooltip: React.FC<Props> = ({ children, isVisible, direction = 'top', className }) => {
  return (
    <StyledTooltip isVisible={isVisible} direction={direction} className={className}>
      <Wrapper>{children}</Wrapper>
    </StyledTooltip>
  );
};

export default Tooltip;
