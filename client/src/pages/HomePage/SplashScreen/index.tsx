import styled from 'styled-components';
import React, { useRef } from 'react';
import Screen from 'src/features/App/Layout/Screen';
import { globalStore } from 'src/stores/GlobalStore';
import { useIntersection } from '../hooks/useIntersection';

const SplashVideo = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  z-index: 0;
  overflow: hidden;
`;

const SplashLogoContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SplashLogo = styled.img`
  cursor: pointer;
  width: 750px;
  height: 473px;
  max-width: 100vw;
  object-fit: contain;
`;

const SplashScreen: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useIntersection(containerRef, 'index');

  return (
    <div ref={containerRef}>
      <Screen>
        <SplashVideo autoPlay muted loop>
          <source src="https://urussu.s3.eu-central-1.amazonaws.com/videos/mp4-splash.m4v" type="video/mp4" />
        </SplashVideo>

        <SplashLogoContainer>
          <SplashLogo src="/images/splash-logo.png" onClick={(): void => globalStore.setCurrentScreen('map')} />
        </SplashLogoContainer>
      </Screen>
    </div>
  );
};

export default SplashScreen;
