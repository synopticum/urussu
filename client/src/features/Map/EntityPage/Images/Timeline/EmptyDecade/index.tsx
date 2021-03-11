import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/GlobalStyle/theme';

const EmptyDecadeValue = styled.div`
  cursor: default;
  padding: 5px 25px 8px 25px;
  color: ${theme.colors.black.b};
  font-size: 14px;
  border-bottom: 1px solid ${theme.colors.black.b};
  user-select: none;
`;

const StyledEmptyDecade = styled.li`
  position: relative;

  &:first-of-type ${EmptyDecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${theme.colors.black.a}, ${theme.colors.black.b});
  }

  &:last-of-type ${EmptyDecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, ${theme.colors.black.a}, ${theme.colors.black.b});
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 1px;
    height: 6px;
    background-color: ${theme.colors.black.b};
  }
`;

export const EmptyDecade: React.FC = ({ children }) => {
  return (
    <StyledEmptyDecade>
      <EmptyDecadeValue>{children}</EmptyDecadeValue>
    </StyledEmptyDecade>
  );
};
