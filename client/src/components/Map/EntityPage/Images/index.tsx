import React from 'react';
import styled from 'styled-components';
import { objectStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { ImagesMapped } from 'src/stores/MapStore/ObjectStore/map';

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
      {/*<div>{JSON.stringify(images)}</div>*/}
    </StyledImages>
  );
};

export default Images;
