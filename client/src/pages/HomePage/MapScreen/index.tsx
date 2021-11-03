import React from 'react';
import Screen from 'src/features/App/Layout/Screen';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import Background from './Background';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Go = styled.a`
  position: absolute;
  left: calc(50% - 150px);
  top: calc(50% - 35px);
  font-family: 'PT Mono', monospace;
  font-size: 24px;
  text-decoration: none;
  width: 300px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white.a};
  border-radius: 10px;
  z-index: 100;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  isVisible?: boolean;
};

const MapScreen: React.FC<Props> = ({ isVisible }) => {
  return (
    <div>
      <Screen>
        <Wrapper>
          <Background />
        </Wrapper>
        {/*<Go href="/map" onMouseOver={mouseOver} onMouseOut={mouseOut}>*/}
        {/*  Начать просмотр*/}
        {/*</Go>*/}
      </Screen>
    </div>
  );
};

export default MapScreen;
