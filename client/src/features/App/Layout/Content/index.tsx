import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

export const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${theme.colors.blue.a};
`;

export const Content = styled.div`
  display: flex;
  flex: 1 1 0;
  height: 100%;

  & > div {
    position: relative;
    flex: 1;
    background-color: ${theme.colors.black.a};

    &::after {
      content: '';
      position: absolute;
      pointer-events: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 495;
      box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
    }
  }
`;

export default Content;
