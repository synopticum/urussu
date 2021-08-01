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

const Logo = styled.div`
  pointer-events: none;
  position: absolute;
  right: 25px;
  top: -62px;
  width: 150px;
  height: 54px;
  background: url('images/logo.png') no-repeat;
  background-size: cover;
  z-index: 500;

  @media screen and (-webkit-min-device-pixel-ratio: 1.25) {
    background: url('images/logo@2x.png') no-repeat;
    background-size: cover;
  }
`;

export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Logo />
    </StyledFooter>
  );
};

export default Footer;
