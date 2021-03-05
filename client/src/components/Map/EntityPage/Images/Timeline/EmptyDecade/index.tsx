import React from 'react';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

const EmptyDecadeValue = styled.div`
  cursor: default;
  padding: 5px 25px 8px 25px;
  color: ${color('black-2')};
  font-size: 14px;
  border-bottom: 1px solid ${color('black-2')};
`;

const StyledEmptyDecade = styled.li`
  position: relative;

  &:first-of-type ${EmptyDecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${color('black-1')}, ${color('black-2')});
  }

  &:last-of-type ${EmptyDecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, ${color('black-1')}, ${color('black-2')});
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 1px;
    height: 6px;
    background-color: ${color('black-2')};
  }
`;

export const EmptyDecade: React.FC = ({ children }) => {
  return (
    <StyledEmptyDecade>
      <EmptyDecadeValue>{children}</EmptyDecadeValue>
    </StyledEmptyDecade>
  );
};
