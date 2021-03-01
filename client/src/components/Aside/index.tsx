import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

const Aside = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 600;
  width: 60px;
  height: 100%;
  background: ${color('black-1')};
  overflow: hidden;
`;

export default Aside;
