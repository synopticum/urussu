import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/components/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';

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

type Props = {};

export const Images: React.FC<Props> = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!store || !data.images) {
    return <div>No images found</div>;
  }

  imagesStore.selectedImage = imagesStore.selectedImage || imagesStore.initialImage;

  return (
    <StyledImages>
      <CurrentImage>
        <img src={`${process.env.S3_URL}/${imagesStore.selectedImage.url}`} alt="" />
      </CurrentImage>

      <Timeline />
    </StyledImages>
  );
});

export default Images;
