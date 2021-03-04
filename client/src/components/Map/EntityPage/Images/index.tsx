import React from 'react';
import styled from 'styled-components';
import { objectStore } from 'src/stores';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { Timeline } from 'src/components/Map/EntityPage/Images/Timeline';

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
  }
`;

type Props = {
  images: ImagesMapped;
  initialImage: string;
};

export const Images: React.FC<Props> = ({ images, initialImage }) => {
  if (!images) {
    return <div>No images found</div>;
  }

  return (
    <StyledImages>
      <CurrentImage>
        <img src={objectStore.initialImage} alt="" />
      </CurrentImage>
      <Timeline images={images} />
    </StyledImages>
  );
};

export default Images;
