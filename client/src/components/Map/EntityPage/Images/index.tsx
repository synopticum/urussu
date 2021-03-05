import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/components/Map/EntityPage/Images/Timeline';
import { objectStore } from 'src/stores';
import { observer } from 'mobx-react-lite';

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
  const { data } = objectStore.apiData;

  if (!data.images) {
    return <div>No images found</div>;
  }

  objectStore.selectedImage = objectStore.selectedImage || objectStore.initialImage;

  return (
    <StyledImages>
      <CurrentImage>
        <img src={`${process.env.S3_URL}/${objectStore.selectedImage.url}`} alt="" />
      </CurrentImage>

      <Timeline />
    </StyledImages>
  );
});

export default Images;
