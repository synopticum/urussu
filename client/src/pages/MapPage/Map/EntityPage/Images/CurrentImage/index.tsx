import styled from 'styled-components';
import React, { MouseEventHandler, ReactEventHandler, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { currentImageStore } from 'src/stores/MapStore/EntityStore/ImagesStore/CurrentImageStore';
import { throttle } from 'src/utils/throttle';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

const StyledCurrentImage = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  user-select: none;
`;

const Image = styled.img<{ height: string; scale: number }>`
  width: auto;
  height: ${({ height }): string => height};
  user-select: none;
  transition: transform 0.4s linear;
`;

const CurrentImage: React.FC = observer(() => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current) {
      currentImageStore.ref = ref;
    }
  }, [ref.current]);

  const onImageLoad: ReactEventHandler<HTMLImageElement> = e => {
    const target = e.target as HTMLImageElement;

    currentImageStore.isImageLoading = false;

    currentImageStore.clientWidth = target.clientWidth;
    currentImageStore.clientHeight = target.clientHeight;
    currentImageStore.naturalWidth = target.naturalWidth;
    currentImageStore.naturalHeight = target.naturalHeight;

    currentImageStore.ref.current.style.transform = `scale(${currentImageStore.scale}) translateY(0)`;
  };

  const throttledMove = throttle<MouseEventHandler<HTMLDivElement>>(currentImageStore.move.bind(currentImageStore), 6);

  return (
    <StyledCurrentImage>
      <Image
        src={imagesStore.selectedImageUrl}
        height={currentImageStore.height}
        scale={currentImageStore.scale}
        ref={ref}
        onLoad={onImageLoad}
        onMouseMove={throttledMove}
        draggable={false}
      />
    </StyledCurrentImage>
  );
});

export default CurrentImage;
