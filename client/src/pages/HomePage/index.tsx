import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Timer from './Timer';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Page from 'src/components/Page';
import Aside from 'src/components/Page/Aside';
import Content from 'src/components/Page/Content';
import { globalStore } from 'src/stores/GlobalStore';

const StyledHomePage = styled(Page)``;

type Props = {} & RouteComponentProps;

const HomePage: React.FC<Props> = observer(() => {
  const { isFetching, error, data } = globalStore.apiData;
  const content = isFetching ? <div>Fetching...</div> : error ? <div>Error: {error}</div> : <div>{data}</div>;
  const fetchTestData = (): Promise<void> => globalStore.fetchData();

  return (
    <StyledHomePage>
      <Aside>asd</Aside>
      <Content>
        <h1>Trulala trulala 2!</h1>
        <div>{globalStore.title}</div>
        <div>{content}</div>
        <div>
          <button onClick={fetchTestData}>test async</button>
        </div>
        <Timer />
      </Content>
    </StyledHomePage>
  );
});

export default HomePage;
