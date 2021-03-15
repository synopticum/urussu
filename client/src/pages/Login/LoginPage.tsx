import React from 'react';
import { Redirect, RouteComponentProps, useLocation } from '@reach/router';
import { parse } from 'query-string';
import { authStore } from 'src/stores/AuthStore';

const LoginPage: React.FC<RouteComponentProps> = () => {
  const location = useLocation();
  const { code } = parse(location.search);

  if (typeof code === 'string') {
    authStore.login(code);
  }

  location.search = '';

  return <Redirect to="/" noThrow />;
};

export default LoginPage;
