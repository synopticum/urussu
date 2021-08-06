import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: none;
  pointer-events: none;
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: url('/images/common/skyline.svg') no-repeat 50% calc(100% + 15px);
  background-size: 1400px;
  z-index: 400;

  @media only screen and (min-width: 1000px) {
    display: flex;
  }
`;

export const Footer: React.FC = () => {
  return <StyledFooter />;
};

export default Footer;
