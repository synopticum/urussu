import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMap } from 'src/features/Map/hooks/use-map';
import Container from 'src/features/Map/Container';
import Dots from './Container/Dots';
import Objects from './Container/Objects';
import Paths from './Container/Paths';
import Circles from './Container/Circles';
import EntityPage from './EntityPage';
import { ActiveEntity } from 'src/features/Map/Container/ActiveEntity';
import Portal from 'src/features/App/Portal';
import Button from 'src/features/Page/Aside/Button';
import Search from 'src/features/Map/Search';
import { Control } from 'src/features/Page/Aside';
import { mapStore } from 'src/stores/MapStore';
import { controlsStore } from 'src/stores/ControlsStore';
import theme from 'src/features/GlobalStyle/theme';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${theme.colors.black.a};
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
