import { authStore, userStore } from 'src/stores';
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import Login from 'src/components/Header/UserMenu/Login';
import state from './state';
import { useClickOutside } from 'src/components/App/use-outside-click';

const StyledUserMenu = styled.span`
  position: relative;
`;

const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${color('blue-1')};
`;

const Avatar = styled.img`
  cursor: pointer;
  border-radius: 5px;
`;

const Menu = styled.ul`
  position: absolute;
  right: 0;
  top: 60px;
  width: 150px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${color('white-1')};
`;

const Item = styled.li`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const UserMenu: React.FC = observer(() => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    state.isOpen = false;
  });

  const toggleMenu = (e: React.MouseEvent): void => {
    e.stopPropagation();
    state.isOpen = !state.isOpen;
  };

  const { isLogged } = authStore;
  if (!isLogged) return <Login />;

  const { data } = userStore.apiData;
  if (!data) return null;

  return (
    <StyledUserMenu>
      <Avatar src={data.image} width="50" height="50" alt="" onClick={toggleMenu} />

      {state.isOpen && (
        <Menu ref={menuRef}>
          <Item>Привет, {data.firstName}</Item>
          <Item>
            <Link onClick={(): void => authStore.logout()}>Выйти</Link>
          </Item>
        </Menu>
      )}
    </StyledUserMenu>
  );
});

export default UserMenu;
