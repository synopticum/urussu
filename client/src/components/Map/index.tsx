import React, { useEffect, useRef } from 'react';
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
import { ActiveEntity } from 'src/components/Map/Container/ActiveEntity';
import Portal from 'src/components/App/Portal';
import Button from 'src/components/Page/Aside/Button';
import Search from 'src/components/Map/Search';
import { Control } from 'src/components/Page/Aside';
import { mapStore } from 'src/stores/MapStore';
import { controlsStore } from 'src/stores/ControlsStore';
import { color } from 'src/components/GlobalStyle/theme/helpers';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${color('black-1')};
`;

const Router: React.FC = observer(() => {
  window.history.replaceState({}, '', mapStore.route);
  return null;
});

const Map: React.FC = observer(() => {
  const containerRef = useRef(null);
  useMap(containerRef);

  const { entity } = mapStore;

  const toggleSearch = (): void => {
    mapStore.toggleSearch();
  };

  useEffect(() => {
    return (): void => {
      mapStore.resetData();
    };
  }, []);

  return (
    <StyledMap>
      <Router />
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
            <Button type={controlsStore.getStateFor('search')} onClick={toggleSearch} />
          </Control>
        </Portal>
      )}

      <EntityPage entity={entity} />
    </StyledMap>
  );
});

export default Map;
