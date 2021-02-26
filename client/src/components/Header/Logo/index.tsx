import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

const StyledLogo = styled.header`
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  &.active {
    cursor: default;
    pointer-events: none;
  }
`;

type Props = {};

const Logo: React.FC<Props> = () => {
  const title = 'Go back to homepage';

  return (
    <StyledLogo>
      <NavLink to="/" title={title}>
        <img src="/images/logo.png" width="287" height="38" alt={title} />
      </NavLink>
    </StyledLogo>
  );
};

export default Logo;
