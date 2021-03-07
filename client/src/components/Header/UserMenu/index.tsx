import React, { useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import Login from 'src/components/Header/UserMenu/Login';
import state from './state';
import { useClickOutside } from 'src/components/App/hooks/use-outside-click';
import { Menu, MenuItem } from 'src/components/Header/UserMenu/Menu';
import { authStore } from 'src/stores/AuthStore';
import { userStore } from 'src/stores/UserStore';

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

const UserMenu: React.FC = observer(() => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    state.isOpen = false;
  });

  const toggleMenu = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    state.isOpen = !state.isOpen;
  }, []);

  const { isLogged } = authStore;
  if (!isLogged) return <Login />;

  const { data } = userStore.apiData;
  if (!data) return null;

  return (
    <StyledUserMenu>
      <Avatar src={data.image} width="50" height="50" alt="" onClick={toggleMenu} />

      {state.isOpen && (
        <Menu ref={menuRef}>
          <MenuItem>Привет, {data.firstName}</MenuItem>
          <MenuItem>
            <Link onClick={(): void => authStore.logout()}>Выйти</Link>
          </MenuItem>
        </Menu>
      )}
    </StyledUserMenu>
  );
});

export default UserMenu;
