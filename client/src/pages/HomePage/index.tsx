import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Timer from './Timer';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Aside from 'src/features/Page/Aside';
import Content from 'src/features/Page/Content';
import { globalStore } from 'src/stores/GlobalStore';

const StyledHomePage = styled(Page)``;

const HomePage: React.FC<RouteComponentProps> = observer(() => {
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
