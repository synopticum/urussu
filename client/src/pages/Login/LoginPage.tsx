import React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { authStore } from 'src/stores/AuthStore';

type Props = {} & RouteComponentProps;

const LoginPage: React.FC<Props> = () => {
  const location = useLocation();
  const { code } = parse(location.search);

  if (typeof code === 'string') {
    authStore.login(code);
  }

  location.search = '';

  return <Redirect to="/" noThrow />;
};

export default LoginPage;
