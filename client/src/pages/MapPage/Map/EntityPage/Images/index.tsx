import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import CurrentImage from 'src/pages/MapPage/Map/EntityPage/Images/CurrentImage';
import { controlsStore } from 'src/stores/ControlsStore';

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
`;

const closeActiveControls = (): void => controlsStore.toggle(controlsStore.selected);

export const Images = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!store || !data.images) {
    return <NoImages>Фотографии отсутствуют.</NoImages>;
  }

  imagesStore.selectedImageId = imagesStore.selectedImageId || imagesStore.initialImageId;

  return (
    <StyledImages onClick={closeActiveControls}>
      <CurrentImage />
      <Timeline />
    </StyledImages>
  );
});

export default Images;
