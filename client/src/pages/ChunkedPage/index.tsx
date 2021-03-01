import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Page, Aside, Content } from 'src/components/Page';

const StyledChunkedPage = styled(Page)`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {
  id?: string;
} & RouteComponentProps;

const ChunkedPage: React.FC<Props> = ({ id }) => (
  <StyledChunkedPage>
    <Aside>asd</Aside>
    <Content>chunked page {id}</Content>
  </StyledChunkedPage>
);

export default ChunkedPage;
