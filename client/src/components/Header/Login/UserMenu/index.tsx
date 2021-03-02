import { authStore, userStore } from 'src/stores';
import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

const StyledUserMenu = styled.span`
  color: ${color('white-1')};
`;

const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${color('blue-1')};
`;

const UserMenu: React.FC = observer(() => {
  const { data } = userStore.apiData;

  if (!data) {
    return null;
  }

  return (
    <StyledUserMenu>
      {<img src={data.image} alt="" />}
      Hi {data.firstName}, <Link onClick={(): void => authStore.logout()}>Logout</Link>
    </StyledUserMenu>
  );
});

export default UserMenu;
