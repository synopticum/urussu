import styled from 'styled-components';
import React from 'react';
import { objectStore } from 'src/stores';
import { ImageMapped } from 'src/stores/MapStore/EntitiesStore';
import { observer } from 'mobx-react-lite';
import { color } from 'src/components/GlobalStyle/theme';

const StyledYears = styled.ul<{ isDecadeActive: boolean }>`
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  display: ${({ isDecadeActive }): string => (isDecadeActive ? 'flex' : 'none')};
`;

const Image = styled.li`
  position: relative;
  margin: 0 5px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const YearValue = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 5px 10px;
  border-radius: 10px;
  white-space: nowrap;
  background-color: ${({ isActive }): string => (isActive ? color('blue-1') : color('white-1'))};
`;

const NestedYearValue = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  padding: 5px 10px;
  border-radius: 10px;
  white-space: nowrap;
  background-color: ${({ isActive }): string => (isActive ? color('blue-1') : color('white-1'))};
`;

type Props = {
  decade: string;
  images: ImageMapped[];
  isDecadeActive?: boolean;
};

export const Years: React.FC<Props> = observer(({ decade, images, isDecadeActive }) => {
  const changeSelectedImage = (image: ImageMapped): void => {
    objectStore.selectedImage = image;
  };

  const isActive = (image: ImageMapped): boolean => {
    const { year, url } = objectStore.selectedImage;
    return image.year === year && image.url === url;
  };

  return (
    <StyledYears isDecadeActive={isDecadeActive}>
      {images.map(image => {
        const { year, url, image: nestedImage } = image;

        return (
          <Image key={url}>
            <YearValue isActive={isActive(image)} onClick={(): void => changeSelectedImage(image)}>
              {year}
            </YearValue>
            {nestedImage && (
              <NestedYearValue isActive={isActive(nestedImage)} onClick={(): void => changeSelectedImage(nestedImage)}>
                {nestedImage.year}
              </NestedYearValue>
            )}
          </Image>
        );
      })}
    </StyledYears>
  );
});
