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

  & > div {
    position: relative;
    flex: 1;
    background-color: ${theme.colors.black.a};
    --inner-border: 15px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      pointer-events: none;
    }

    &::after {
      left: 65px;
      top: var(--inner-border);
      width: calc(100% - 65px - var(--inner-border));
      height: calc(100% - var(--inner-border) * 2);
      z-index: 495;
      box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
    }

    &::before {
      left: 65px;
      top: 0;
      z-index: 500;
      width: calc(100% - 50px - var(--inner-border) * 2);
      height: calc(100% - 30px);
      margin: 15px 15px 15px 0;
      box-sizing: border-box;
      background: transparent;
      border-radius: 10px;
      box-shadow: rgb(17 17 17) 0 0 0 10px;
      outline: var(--inner-border) solid ${theme.colors.black.a};
    }
  }
`;

export default Content;
