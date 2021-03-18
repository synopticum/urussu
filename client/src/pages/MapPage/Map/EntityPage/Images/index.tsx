import React, { MouseEventHandler, MutableRefObject, ReactEventHandler, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Timeline } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { throttle } from 'src/utils/throttle';

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

const CurrentImage = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

export type ImageProps = {
  clientWidth: number;
  clientHeight: number;
  naturalWidth: number;
  naturalHeight: number;
  current: HTMLImageElement;
};

const StyledImage = styled.img<{ height: string; scale: number }>`
  width: auto;
  height: ${({ height }): string => height};
  user-select: none;
  transform: ${({ scale }): string => {
    // debugger;
    return `scale(1)`;
  }};
  transition: transform 0.3s linear;
`;

const Image: React.FC = observer(() => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current) {
      imagesStore.ref = ref;
    }
  }, [ref.current]);

  const onImageLoad: ReactEventHandler<HTMLImageElement> = e => {
    const target = e.target as HTMLImageElement;

    imagesStore.isImageLoading = false;

    imagesStore.clientWidth = target.clientWidth;
    imagesStore.clientHeight = target.clientHeight;
    imagesStore.naturalWidth = target.naturalWidth;
    imagesStore.naturalHeight = target.naturalHeight;

    imagesStore.ref.current.style.transform = `scale(${imagesStore.scale}) translateY(0)`;
  };

  const throttledMove = throttle<MouseEventHandler<HTMLDivElement>>(imagesStore.move.bind(imagesStore), 16);

  return (
    <StyledImage
      src={imagesStore.selectedImageUrl}
      height={imagesStore.height}
      scale={imagesStore.scale}
      ref={ref}
      onLoad={onImageLoad}
      onMouseMove={throttledMove}
    />
  );
});

type Props = {
  onClick: () => void;
};

export const Images: React.FC<Props> = observer(({ onClick }) => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!store || !data.images) {
    return <NoImages>Фотографии отсутствуют.</NoImages>;
  }

  imagesStore.selectedImageId = imagesStore.selectedImageId || imagesStore.initialImageId;

  return (
    <StyledImages onClick={onClick}>
      <CurrentImage>
        <Image />
      </CurrentImage>

      <Timeline />
    </StyledImages>
  );
});

export default Images;
