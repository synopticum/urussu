import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import UserMenu from './UserMenu';
import l from './locale';
import { observer } from 'mobx-react-lite';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledHeader = styled.header`
  position: relative;
  z-index: 1060;
  height: 70px;
  padding: 15px 25px 0 75px;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.black.a};
  justify-content: flex-end;
`;

const Nav = styled.div`
  font-style: italic;
`;

const StyledNavLink = styled(Link)`
  margin: 0 20px 0 0;
  text-decoration: underline;

  &.active {
    cursor: default;
    text-decoration: none;
    color: ${theme.colors.black.a};
  }
`;

const NavLink: React.FC<{ to: string }> = props => {
  const getProps = ({ isCurrent }: { isCurrent: boolean }): unknown => {
    return {
      style: {
        color: isCurrent ? theme.colors.white.a : theme.colors.blue.a,
        textDecoration: isCurrent ? 'none' : 'underline',
        cursor: isCurrent ? 'default' : 'pointer',
      },
    };
  };

  return <StyledNavLink {...props} getProps={getProps} />;
};

const Title = styled.div`
  font-size: 32px;
  margin-right: auto;
  color: ${theme.colors.white.a};
`;

const Header: React.FC = observer(() => {
  const { address, title } = objectStore;

  return (
    <StyledHeader>
      <Title>{address || title}</Title>

      <Nav>
        <NavLink to="map">{l('Карта')}</NavLink>
        <NavLink to="contact-us">{l('Страница')}</NavLink>
        <NavLink to="chunked-page/123">Chunked Page</NavLink>
      </Nav>
      <UserMenu />
    </StyledHeader>
  );
});

export default Header;
