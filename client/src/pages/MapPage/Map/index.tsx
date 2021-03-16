import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useMap } from 'src/pages/MapPage/Map/hooks/use-map';
import Container from 'src/pages/MapPage/Map/Container';
import Dots from './Container/Dots';
import Objects from './Container/Objects';
import Paths from './Container/Paths';
import Circles from './Container/Circles';
import EntityPage from './EntityPage';
import { ActiveEntity } from 'src/pages/MapPage/Map/Container/ActiveEntity';
import Portal from 'src/features/App/Portal';
import Button from 'src/features/Page/Aside/Button';
import Search from 'src/pages/MapPage/Map/Search';
import { Control } from 'src/features/Page/Aside';
import { mapStore } from 'src/stores/MapStore';
import { controlsStore } from 'src/stores/ControlsStore';
import theme from 'src/features/App/GlobalStyle/theme';
import Drawer from 'src/pages/MapPage/Map/Drawer';
import { userStore } from 'src/stores/UserStore';
import ConfirmationTooltip from 'src/components/Tooltip/ConfirmationTooltip';
import { dotsStore } from 'src/stores/MapStore/DotsStore';
import { LeafletMouseEvent } from 'leaflet';

const StyledMap = styled.div`
  height: 100%;
  background-color: ${theme.colors.black.a};
`;

const DotCreator = styled.div<{ x: number; y: number; isVisible: boolean }>`
  position: absolute;
  left: ${({ x }): string => `${x}px`};
  top: ${({ y }): string => `${y}px`};
  opacity: ${({ isVisible }): string => (isVisible ? '1' : '0')};
  transition: opacity 0.15s;
  width: 3px;
  height: 3px;
  background-color: #ff0000;
  z-index: 1050;
`;

const Router: React.FC = observer(() => {
  window.history.replaceState({}, '', mapStore.route);
  return null;
});

const Map: React.FC = observer(() => {
  const containerRef = useRef(null);
  useMap(containerRef);

  const { entity, dotCreator } = mapStore;
  const { isAdmin } = userStore;

  const toggleSearch = (): void => {
    mapStore.toggleSearch();
  };

  const switchToAddMode = (e: KeyboardEvent): void => {
    if (containerRef.current && e.key === 'Alt') {
      containerRef.current.style.setProperty('cursor', 'crosshair', 'important');
    }
  };

  const switchToDefaultMode = (e: KeyboardEvent): void => {
    if (containerRef.current && e.key === 'Alt') {
      containerRef.current.style.setProperty('cursor', 'grab', 'important');
    }
  };

  const cancelCreatingDot = (): void => {
    dotCreator.hide();
  };

  const confirmCreatingDot = (): void => {
    dotsStore.add();
    dotCreator.hide();
  };

  useEffect(() => {
    document.addEventListener('keydown', switchToAddMode);
    document.addEventListener('keyup', switchToDefaultMode);

    return (): void => {
      document.removeEventListener('keydown', switchToAddMode);
      document.addEventListener('keyup', switchToDefaultMode);
      mapStore.resetData();
    };
  }, []);

  return (
    <StyledMap>
      <Router />
      <Container ref={containerRef} mode={mapStore.mode}>
        {isAdmin && <Drawer />}

        <Dots />
        <Objects />
        <Paths />
        <Circles />

        <DotCreator x={dotCreator.x} y={dotCreator.y} isVisible={dotCreator.isVisible}>
          <ConfirmationTooltip
            isVisible={dotCreator.isVisible}
            direction={dotCreator.direction}
            onCancel={cancelCreatingDot}
            onConfirm={confirmCreatingDot}
            cancelText="Отмена"
            confirmText="Создать точку"
          />
        </DotCreator>

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
