import React from 'react';
import Screen from 'src/features/App/Layout/Screen';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Go = styled.a`
  display: block;
`;

type Props = {
  isVisible: boolean;
};

const MapScreen: React.FC<Props> = ({ isVisible }) => {
  return (
    <Screen>
      {/*{isVisible && (*/}
      {/*  <>*/}
      {/*    <Map />*/}
      {/*    <Controls />*/}
      {/*  </>*/}
      {/*)}*/}
      <Wrapper>
        <Go href="/map">Начать просмотр</Go>
      </Wrapper>
    </Screen>
  );
};

export default MapScreen;
