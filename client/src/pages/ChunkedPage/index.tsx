import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Page from 'src/components/Page';
import Aside from 'src/components/Page/Aside';
import Content from 'src/components/Page/Content';

const StyledChunkedPage = styled(Page)`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {
  id?: string;
} & RouteComponentProps;

const ChunkedPage: React.FC<Props> = ({ id }) => {
  return (
    <StyledChunkedPage>
      <Aside>asd</Aside>
      <Content>
        <div>chunked page {id}</div>
      </Content>
    </StyledChunkedPage>
  );
};

export default ChunkedPage;
