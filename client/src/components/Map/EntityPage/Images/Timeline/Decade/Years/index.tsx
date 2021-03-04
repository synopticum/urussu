import styled from 'styled-components';
import React from 'react';
import { objectStore } from 'src/stores';
import { color } from 'src/components/GlobalStyle/theme';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { observer } from 'mobx-react-lite';

const StyledYears = styled.ul<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  display: ${({ isActive }): string => (isActive ? 'flex' : 'none')};
`;

const Year = styled.li`
  position: relative;
  margin: 0 5px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

const YearValue = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  white-space: nowrap;
  background-color: ${color('white-1')};
`;

const NestedYearValue = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  padding: 5px 10px;
  border-radius: 10px;
  white-space: nowrap;
  background-color: ${color('white-1')};
`;

const isNested = (currentYear: string): boolean => currentYear.toString().includes('_');

const getNested = (currentYear: string, images: ImageMapped[]): ImageMapped =>
  images.find(({ year }) => year.includes(`${currentYear}_`));

type Props = {
  decade: string;
  images: ImageMapped[];
  isActive?: boolean;
};

export const Years: React.FC<Props> = observer(({ decade, isActive, images }) => {
  const changeSelectedImage = (image: ImageMapped, decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
    objectStore.selectedImage = image;
  };

  return (
    <StyledYears isActive={isActive}>
      {images.map(image => {
        const nested = getNested(image.year, images);

        return (
          <Year key={image.url}>
            {!isNested(image.year) && (
              <YearValue onClick={(): void => changeSelectedImage(image, decade)}>{image.year}</YearValue>
            )}
            {nested && (
              <NestedYearValue onClick={(): void => changeSelectedImage(nested, decade)}>
                {nested.year.split('_')[1]}
              </NestedYearValue>
            )}
          </Year>
        );
      })}
    </StyledYears>
  );
});
