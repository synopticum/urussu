import React from 'react';
import styled from 'styled-components';
import Logo from 'src/components/Header/Logo';

const StyledFooter = styled.footer`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: var(--main-dark);
`;

type Props = {};

export const Footer: React.FC<Props> = () => {
  return (
    <StyledFooter>
      <Logo />
    </StyledFooter>
  );
};

export default Footer;
