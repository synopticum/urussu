import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

export const Page = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Aside = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1060;
  width: 60px;
  height: 100%;
  background: ${color('black-1')};
  overflow: hidden;
`;

export const Content = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${color('white-1')};
  padding: 40px 40px 40px 90px;
`;
