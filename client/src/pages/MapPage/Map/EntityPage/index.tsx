import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Entity, mapStore } from 'src/stores/MapStore';
import ObjectPage from 'src/pages/MapPage/Map/EntityPage/ObjectPage';
import DotPage from 'src/pages/MapPage/Map/EntityPage/DotPage';
import PathPage from 'src/pages/MapPage/Map/EntityPage/PathPage';
import theme from 'src/features/App/GlobalStyle/theme';
import { controlsStore } from 'src/stores/ControlsStore';
import { EntityId } from 'src/contracts/entities';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import Button from 'src/features/Page/Controls/Button';

const StyledEntityPage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
`;

const Wrapper = styled.div`
  --inner-border: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.white.a};

  &::before {
    ${theme.chunks.innerBorder()}
    display: none;

    @media only screen and (min-width: 1000px) {
      display: block;
    }
  }
`;

const Close = styled(Button)`
  position: absolute;
  right: 20px;
  top: 23px;
  z-index: 1060;
`;

const Pages: { dot: typeof DotPage; object: typeof ObjectPage; path: typeof ObjectPage; circle: typeof ObjectPage } = {
  dot: DotPage,
  object: ObjectPage,
  path: PathPage,
  circle: ObjectPage,
};

const close = (): void => {
  mapStore.setEntity(null);
};

const handleEscape = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    if (controlsStore.selected) {
      controlsStore.toggle(controlsStore.selected);
      return;
    }

    close();
  }
};

const handleImagesArrows = ({ code }: KeyboardEvent): void => {
  if (code === 'ArrowLeft' || code === 'ArrowRight') {
    const navigate = (id: EntityId): void => {
      objectStore.resetData();
      objectStore.initData(id);
      mapStore.setEntity({ type: 'object', id });
    };

    if (code === 'ArrowLeft') {
      navigate(objectStore.siblingsIds.previous);
    }

    if (code === 'ArrowRight') {
      navigate(objectStore.siblingsIds.next);
    }
  }
};

type Props = {
  entity: Entity;
};

export const EntityPage: React.FC<Props> = ({ entity }) => {
  if (!entity) {
    return null;
  }

  useEffect(() => {
    document.addEventListener('keyup', handleEscape);
    document.addEventListener('keyup', handleImagesArrows);

    return (): void => {
      document.removeEventListener('keyup', handleEscape);
      document.removeEventListener('keyup', handleImagesArrows);
      close();
    };
  }, []);

  const Page = Pages[entity.type];

  return (
    <StyledEntityPage>
      <Wrapper>
        <Close type="close" onClick={close} />
        <Page id={entity.id} />
      </Wrapper>
    </StyledEntityPage>
  );
};

export default EntityPage;
