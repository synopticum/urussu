import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import Logo from './Logo';
import l from './locale';
import { observer } from 'mobx-react-lite';
import { color } from 'src/components/GlobalStyle/theme';
import { userStore } from 'src/stores';

const StyledHeader = styled.header`
  position: relative;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  background-color: ${color('black-1')};
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
    color: ${color('black-1')};
  }
`;

const NavLink: React.FC<{ to: string }> = props => (
  <StyledNavLink
    {...props}
    getProps={({ isCurrent }): unknown => {
      return {
        style: {
          color: isCurrent ? color('white-1') : color('blue-1'),
          textDecoration: isCurrent ? 'none' : 'underline',
          cursor: isCurrent ? 'default' : 'pointer',
        },
      };
    }}
  />
);

type Props = {};

const Header: React.FC<Props> = observer(() => {
  const redirectUrl = `${window.location.origin}/login`;

  return (
    <StyledHeader>
      <Nav>
        <NavLink to="map">{l('Карта')}</NavLink>
        <NavLink to="contact-us">{l('Страница')}</NavLink>
        <NavLink to="chunked-page/123">Chunked Page</NavLink>
        {!userStore.isLogged ? (
          <a
            href={`https://oauth.vk.com/authorize?client_id=4447151&display=page&redirect_uri=${redirectUrl}&response_type=code&v=5.95`}
          >
            Login
          </a>
        ) : (
          <a onClick={(): void => userStore.logout()}>Logout</a>
        )}
      </Nav>
    </StyledHeader>
  );
});

export default Header;
