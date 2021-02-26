import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';

const StyledError404 = styled.div`
  color: red;
`;

type Props = {} & RouteComponentProps;

const Error404: React.FC<Props> = () => {
  return <StyledError404>Hello 404</StyledError404>;
};

export default Error404;
