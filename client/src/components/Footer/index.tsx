import React from 'react';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

const StyledFooter = styled.footer`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${color('black-1')};
`;

export const Footer: React.FC = () => {
  return <StyledFooter>footer</StyledFooter>;
};

export default Footer;
