import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import React from 'react';

const StyledAside = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1060;
  width: 60px;
  height: 100%;
  background: ${color('black-1')};
  overflow: hidden;
  display: flex;
  padding: 23px 0 0 10px;
`;

export default StyledAside;
