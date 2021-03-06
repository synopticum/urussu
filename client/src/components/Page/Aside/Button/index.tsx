import React from 'react';
import styled from 'styled-components';
import searchImage from './images/search.svg';

type ButtonTypes = 'search' | 'close';

const icons: {
  [type in ButtonTypes]: string;
} = {
  search: searchImage,
  close: '',
};

export const StyledButton = styled.button<{ icon: string }>`
  display: block;
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 7px 7px 7px rgba(255, 255, 255, 0.1);
  transition: border-radius 0.2s;
  margin-bottom: 7px;
  background: ${({ icon }): string => `url(${icon}) 50% 50% no-repeat`};
  background-size: 50%;

  &:hover {
    opacity: 1;
    filter: saturate(1);
  }

  &:active {
    box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.5);
  }

  &::after {
    content: '';
    position: absolute;
    right: -10px;
    top: -2px;
    width: 10px;
    height: 48px;
    background: #666;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 0;
    top: 0;
    height: 44px;
  }
`;

type Props = {
  type: ButtonTypes;
};

const Button: React.FC<Props> = ({ type }) => {
  return <StyledButton icon={icons[type]} />;
};

export default Button;
