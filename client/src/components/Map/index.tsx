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
import ObjectPage from './ObjectPage';
import { objectStore } from 'src/stores';
import { color } from 'src/components/GlobalStyle/theme';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${color('black-1')};
`;

const Map: React.FC = observer(() => {
  const containerRef = useRef(null);
  useMap(containerRef);

  // const { data: dotData } = dotStore.apiData;
  const { data: objectData } = objectStore.apiData;
  // const { data: pathData } = pathStore.apiData;

  return (
    <StyledMap>
      <Container ref={containerRef}>
        <Dots />
        <Objects />
        <Paths />
        <Circles />
      </Container>

      {/*{dotData && <Dot />}*/}
      {objectData && <ObjectPage />}
      {/*{pathData && <Path />}*/}
    </StyledMap>
  );
});

export default Map;
