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
import EntityPage from './EntityPage';
import { color } from 'src/components/GlobalStyle/theme';
import { ActiveEntity } from 'src/components/Map/Container/ActiveEntity';
import Portal from 'src/components/App/Portal';
import Button from 'src/components/Page/Aside/Button';
import Search from 'src/components/Map/Search';
import { Control } from 'src/components/Page/Aside';
import { mapStore } from 'src/stores/MapStore';
import { controlsStore } from 'src/stores/ControlsStore';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${color('black-1')};
`;

const Map: React.FC = observer(() => {
  const containerRef = useRef(null);
  useMap(containerRef);

  const { entity } = mapStore;

  const toggleSearch = (): void => {
    if (!controlsStore.selected) {
      controlsStore.selected = 'search';
      return;
    }

    mapStore.activeEntityId = null;
    controlsStore.resetData();
  };

  return (
    <StyledMap>
      <Container ref={containerRef}>
        <Dots />
        <Objects />
        <Paths />
        <Circles />

        <ActiveEntity id={mapStore.activeEntityId} />
      </Container>

      {controlsStore.selected === 'search' && <Search />}

      {!entity && (
        <Portal parent={controlsStore.ref}>
          <Control>
            <Button type={controlsStore.selected === 'search' ? 'close' : 'search'} onClick={toggleSearch} />
          </Control>
        </Portal>
      )}

      <EntityPage entity={entity} />
    </StyledMap>
  );
});

export default Map;
