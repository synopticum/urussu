import styled from 'styled-components';
import theme from 'src/features/GlobalStyle/theme';

export const Menu = styled.ul`
  position: absolute;
  right: 0;
  top: 60px;
  width: 150px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.a};
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
