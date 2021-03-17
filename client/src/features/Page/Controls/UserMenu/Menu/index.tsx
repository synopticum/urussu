import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

export const Menu = styled.ul`
  position: absolute;
  left: calc(100% + 18px);
  bottom: -9px;
  width: 150px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.a};

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    bottom: 25px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--colors-white-a);
  }
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
