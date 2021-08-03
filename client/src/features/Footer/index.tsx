import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: url('/images/common/skyline.svg') no-repeat 50% calc(100% + 5px);
  background-size: 1400px;
  z-index: 400;
`;

export const Footer: React.FC = () => {
  return <StyledFooter />;
};

export default Footer;
