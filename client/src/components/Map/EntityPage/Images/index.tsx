import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/components/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

const StyledImages = styled.div`
  height: 100%;
`;

const CurrentImage = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    border-radius: 10px;
  }
`;

export const Images = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  useEffect(() => {
    return (): void => {
      imagesStore.resetData();
    };
  }, []);

  if (!store || !data.images) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        Фотографии отсутствуют.
      </div>
    );
  }

  imagesStore.selectedImageId = imagesStore.selectedImageId || imagesStore.initialImageId;

  return (
    <StyledImages>
      <CurrentImage>
        <img src={imagesStore.selectedImageUrl} alt="" />
      </CurrentImage>

      <Timeline />
    </StyledImages>
  );
});

export default Images;
