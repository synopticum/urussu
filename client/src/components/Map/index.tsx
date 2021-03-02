import React, { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMap } from 'src/components/Map/hooks/use-map';
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
