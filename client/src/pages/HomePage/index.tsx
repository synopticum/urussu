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
  return (
    <StyledHomePage>
      <Aside>asd</Aside>
      <Content>
        <h1>Trulala trulala 2!</h1>
        <div>{globalStore.title}</div>
        <div>
          <button>test async</button>
        </div>
        <Timer />
      </Content>
    </StyledHomePage>
  );
});

export default HomePage;
