import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import CurrentImage from 'src/pages/MapPage/Map/EntityPage/Images/CurrentImage';
import { controlsStore } from 'src/stores/ControlsStore';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { EntityId } from 'src/contracts/entities';
import { mapStore } from 'src/stores/MapStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledImages = styled.div`
  height: 100%;
`;

const NoImages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 32px;
  background: url('/images/common/skyline.svg') no-repeat 50% calc(100% + 5px);
  background-size: 100%;
  text-align: center;
`;

const Arrow = styled.div`
  cursor: pointer;
  position: absolute;
  top: calc(50% - 45px);
  width: 70px;
  height: 70px;
  background-color: ${theme.colors.black.a};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50px;
  transition: background-position 0.3s;
  z-index: 300;
`;

const Previous = styled(Arrow)`
  left: 0;
  background-image: url('/images/common/arrow-left.svg');

  &:hover {
    background-position: calc(50% - 10px) 50%;
  }
`;

const Next = styled(Arrow)`
  right: 0;
  background-image: url('/images/common/arrow-right.svg');

  &:hover {
    background-position: calc(50% - 10px) 50%;
  }
`;

const closeActiveControls = (): void => controlsStore.toggle(controlsStore.selected);

export const Images = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!store || !data.images) {
    return <NoImages>Фотографии отсутствуют.</NoImages>;
  }

  const navigate = (id: EntityId): void => {
    objectStore.resetData();
    objectStore.initData(id);
    mapStore.setEntity({ type: 'object', id });
  };

  imagesStore.selectedImageId = imagesStore.selectedImageId || imagesStore.initialImageId;

  return (
    <StyledImages onClick={closeActiveControls}>
      <CurrentImage />

      {objectStore.siblingsIds?.previous && (
        <Previous onClick={(): void => navigate(objectStore.siblingsIds.previous)} />
      )}
      {objectStore.siblingsIds?.next && <Next onClick={(): void => navigate(objectStore.siblingsIds.next)} />}

      <Timeline />
    </StyledImages>
  );
});

export default Images;
