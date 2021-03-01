import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import Logo from './Logo';
import l from './locale';
import { observer } from 'mobx-react-lite';

const StyledHeader = styled.header`
  position: relative;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  background-color: var(--main-dark);
  justify-content: flex-end;
`;

const Nav = styled.div`
  margin-top: 12px;
`;

const StyledNavLink = styled(Link)`
  margin: 0 20px 0 0;
  text-decoration: underline;
  font-style: italic;

  &.active {
    cursor: default;
    text-decoration: none;
    color: var(--main-dark);
  }
`;

const NavLink: React.FC<{ to: string }> = props => (
  <StyledNavLink
    {...props}
    getProps={({ isCurrent }): unknown => {
      return {
        style: {
          color: isCurrent ? 'var(--main-light)' : 'var(--link-color)',
          textDecoration: isCurrent ? 'none' : 'underline',
          cursor: isCurrent ? 'default' : 'pointer',
        },
      };
    }}
  />
);

type Props = {};

const Header: React.FC<Props> = observer(() => {
  return (
    <StyledHeader>
      <Nav>
        <NavLink to="map">{l('Карта')}</NavLink>
        <NavLink to="contact-us">{l('Страница')}</NavLink>
        <NavLink to="chunked-page/123">Chunked Page</NavLink>
      </Nav>
    </StyledHeader>
  );
});

export default Header;
