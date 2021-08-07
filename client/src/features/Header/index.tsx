import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import l from './locale';
import { observer } from 'mobx-react-lite';
import theme from 'src/features/App/GlobalStyle/theme';
import { globalStore } from 'src/stores/GlobalStore';

const StyledHeader = styled.header`
  position: relative;
  z-index: 1060;
  height: 55px;
  padding: 10px 25px 0 30px;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.black.a};
  border-bottom: 10px solid ${theme.colors.black.a};

  @media only screen and (min-width: 1000px) {
    border-bottom: 0;
    padding-left: 30px;
  }
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
  font-size: 24px;
  color: ${theme.colors.white.a};
  flex: 1;
  text-align: center;

  @media only screen and (min-width: 1000px) {
    font-size: 28px;
  }
`;

const Header: React.FC = observer(() => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      globalStore.titleRef = titleRef;
    }

    return (): void => {
      globalStore.titleRef = null;
    };
  }, [titleRef.current]);

  return (
    <StyledHeader>
      <Title ref={titleRef} />

      <Nav>
        {/*<NavLink to="/">{l('О посёлке')}</NavLink>*/}
        {/*<NavLink to="/">{l('Карта')}</NavLink>*/}
        {/*<NavLink to="chunked-page/123">Chunked Page</NavLink>*/}
      </Nav>
    </StyledHeader>
  );
});

export default Header;
