import React, { useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import state from './state';
import { useClickOutside } from 'src/features/App/hooks/use-outside-click';
import { Menu, MenuItem } from 'src/features/Page/Controls/UserMenu/Menu';
import { authStore } from 'src/stores/AuthStore';
import { userStore } from 'src/stores/UserStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledUserMenu = styled.div`
  position: relative;
  order: 10;
  margin-top: auto;
  margin-bottom: 4px;
`;

const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${theme.colors.blue.a};
`;

const Avatar = styled.img`
  cursor: pointer;
  border-radius: 5px;
  margin-left: 2px;
`;

const UserMenu: React.FC = observer(() => {
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    state.close();
  });

  const toggleMenu = useCallback((e: React.MouseEvent): void => {
    e.stopPropagation();
    state.toggle();
  }, []);

  const { data } = userStore.apiData;
  if (!data) return null;

  const logout = (): void => {
    authStore.logout();
  };

  return (
    <StyledUserMenu>
      <Avatar src={data.image} width="40" height="40" alt="" onClick={toggleMenu} />

      {state.isOpen && (
        <Menu ref={menuRef}>
          <MenuItem>Привет, {data.firstName}</MenuItem>
          <MenuItem>
            <Link onClick={logout}>Выйти</Link>
          </MenuItem>
        </Menu>
      )}
    </StyledUserMenu>
  );
});

export default UserMenu;
