import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import UserMenu from './UserMenu';
import l from './locale';
import { observer } from 'mobx-react-lite';
import { objectStore } from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import { color } from 'src/components/GlobalStyle/theme/helpers';

const StyledHeader = styled.header`
  position: relative;
  z-index: 1060;
  height: 70px;
  padding: 15px 25px 0 75px;
  display: flex;
  align-items: center;
  background-color: ${color('black-1')};
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
    color: ${color('black-1')};
  }
`;

const NavLink: React.FC<{ to: string }> = props => {
  const getProps = ({ isCurrent }: { isCurrent: boolean }): unknown => {
    return {
      style: {
        color: isCurrent ? color('white-1') : color('blue-1'),
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
  color: ${color('white-1')};
`;

const Header: React.FC = observer(() => {
  const { address } = objectStore;

  return (
    <StyledHeader>
      {address && <Title>{address}</Title>}

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
