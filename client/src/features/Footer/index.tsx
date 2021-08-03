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
  background: url('/images/common/skyline.svg') no-repeat 50% calc(100% + 5px);
  background-color: ${theme.colors.black.a};
  background-size: 1400px;
`;

export const Footer: React.FC = () => {
  return <StyledFooter />;
};

export default Footer;
