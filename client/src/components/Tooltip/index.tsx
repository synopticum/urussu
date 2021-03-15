import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledTooltip = styled.div<{ isVisible: boolean }>`
  opacity: ${({ isVisible }): string => (isVisible ? '1' : '0')};
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  background-color: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.c};
  border-radius: 5px;
  min-width: 100%;
  padding: 5px 10px;
  transition: opacity 0.3s;
  font-size: 14px;

  &::before {
    position: absolute;
    left: calc(50% - 6px);
    top: 100%;
    content: '';
    width: 0;
    height: 0;

    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #f00;
  }
`;

const Wrapper = styled.div``;

type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export type Props = {
  isVisible: boolean;
  direction?: TooltipDirection;
};

const Tooltip: React.FC<Props> = ({ children, isVisible, direction = 'top' }) => {
  return (
    <StyledTooltip isVisible={isVisible}>
      <Wrapper>{children}</Wrapper>
    </StyledTooltip>
  );
};

export default Tooltip;
