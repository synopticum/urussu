import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Page, Aside } from 'src/components/Page';
import { useLocation } from '@reach/router';
import { parse } from 'query-string';
import { userStore } from 'src/stores';

const StyledLoginPage = styled(Page)``;

type Props = {} & RouteComponentProps;

const LoginPage: React.FC<Props> = () => {
  const location = useLocation();
  const { code } = parse(location.search);

  if (typeof code === 'string') {
    userStore.setCode(code);
  }

  return <StyledLoginPage>Redirecting...</StyledLoginPage>;
};

export default LoginPage;
