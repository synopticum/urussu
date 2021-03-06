import styled from 'styled-components';
import { color, shadow } from 'src/components/GlobalStyle/theme';

export const Menu = styled.ul`
  position: absolute;
  right: 0;
  top: 60px;
  width: 150px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${color('white-1')};
  box-shadow: ${shadow('shadow-1')};
`;

export const MenuItem = styled.li`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
