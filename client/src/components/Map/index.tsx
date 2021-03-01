import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMap } from 'src/components/Map/use-map';
import Container from 'src/components/Map/Container';
import Dots from './Container/Dots';
import Objects from './Container/Objects';
import Paths from './Container/Paths';
import Circles from './Container/Circles';
import { mapStore } from 'src/stores';
import { color } from 'src/components/GlobalStyle/theme';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${color('black-1')};

  &::before {
    content: '';
    --inner-border: 15px;
    pointer-events: none;
    position: absolute;
    left: 65px;
    top: 0;
    z-index: 500;
    width: calc(100% - 50px - var(--inner-border) * 2);
    height: calc(100% - 30px);
    margin: 15px 15px 15px 0;
    box-sizing: border-box;
    background: transparent;
    border-radius: 10px;
    box-shadow: rgb(17 17 17) 0 0 0 10px;
    outline: var(--inner-border) solid ${color('black-1')};
  }
`;

const Map: React.FC = observer(() => {
  const containerRef = useRef(null);
  useMap(containerRef);

  console.log(mapStore.currentZoom);

  return (
    <StyledMap>
      <Container ref={containerRef}>
        <Dots />
        <Objects />
        <Paths />
        <Circles />
      </Container>
    </StyledMap>
  );
});

export default Map;
