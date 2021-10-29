import React, { useEffect, useRef, useState } from 'react';
import Screen from 'src/features/App/Layout/Screen';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import { observer } from 'mobx-react-lite';
import { globalStore } from 'src/stores/GlobalStore';
import { useIntersection } from 'src/pages/HomePage/hooks/useIntersection';
import State from './drawer/state/state';

const Background = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('/images/splash-houses.jpg') no-repeat 50% 50%;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: filter 0.3s, opacity 0.3s;
`;

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
  // const containerRef = useRef<HTMLDivElement>(null);
  // useIntersection(containerRef, 'map');

  // const backgroundRef = useRef<HTMLDivElement>(null);

  // const mouseOver = (): void => {
  //   backgroundRef.current.style.filter = 'grayscale(0)';
  //   backgroundRef.current.style.opacity = '1';
  // };
  //
  // const mouseOut = (): void => {
  //   backgroundRef.current.style.filter = 'grayscale(100%)';
  //   backgroundRef.current.style.opacity = '0.5';
  // };

  const [canvasState, setCanvasState] = useState<State>(null);
  const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && !isCanvasReady) {
      setCanvasState(new State(canvasRef.current));
      setIsCanvasReady(true);
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (isCanvasReady) {
      canvasState.triangle.draw();
    }
  }, [isCanvasReady]);

  return (
    <div>
      <Screen>
        <Wrapper>
          <Canvas
            width={document.querySelector('body').offsetWidth}
            height={document.querySelector('body').offsetHeight}
            ref={canvasRef}
          />
        </Wrapper>
        {/*<Go href="/map" onMouseOver={mouseOver} onMouseOut={mouseOut}>*/}
        {/*  Начать просмотр*/}
        {/*</Go>*/}
      </Screen>
    </div>
  );
};

export default MapScreen;
