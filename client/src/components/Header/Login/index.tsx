import { authStore } from 'src/stores';
import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';

const Link = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: ${color('blue-1')};
`;

const Login: React.FC = observer(() => {
  const redirectUrl = `${window.location.origin}/login`;
  const url = `https://oauth.vk.com/authorize?client_id=4447151&display=page&redirect_uri=${redirectUrl}&response_type=code&v=5.95`;

  return !authStore.isLogged ? <a href={url}>Login</a> : <Link onClick={(): void => authStore.logout()}>Logout</Link>;
});

export default Login;
