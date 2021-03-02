import { authStore } from 'src/stores';
import React from 'react';
import { observer } from 'mobx-react-lite';
import UserMenu from 'src/components/Header/Login/UserMenu';

const Login: React.FC = observer(() => {
  const redirectUrl = `${window.location.origin}/login`;
  const url = `https://oauth.vk.com/authorize?client_id=4447151&display=page&redirect_uri=${redirectUrl}&response_type=code&v=5.95`;

  if (!authStore.isLogged) {
    return <a href={url}>Login</a>;
  }

  return <UserMenu />;
});

export default Login;
