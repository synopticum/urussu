import React from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledFooter = styled.footer`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${theme.colors.black.a};
`;

export const Footer: React.FC = () => {
  return <StyledFooter />;
};

export default Footer;
