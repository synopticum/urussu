import React from 'react';
import { ImageMapped, ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import { objectStore } from 'src/stores';
import { observer } from 'mobx-react-lite';

const StyledTimeline = styled.div`
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
`;

const Years = styled.ul`
  display: none;
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
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

const Decades = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Decade = styled.li<{ active: boolean }>`
  position: relative;
  margin: 0 5px;

  ${Years} {
    display: ${({ active }): string => (active ? 'flex' : 'none')};
  }
`;

const DecadeValue = styled.div<{ active: boolean }>`
  cursor: ${({ active }): string => (active ? 'default' : 'pointer')};
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ active }): string => (active ? color('blue-1') : color('white-1'))};
  opacity: 0.3;
`;

export const Timeline: React.FC = observer(() => {
  const { data } = objectStore.apiData;

  if (!data.images) {
    return null;
  }

  objectStore.selectedDecade = objectStore.selectedDecade || objectStore.initialDecade;

  const changeSelectedDecade = (decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
  };

  const changeSelectedImage = (image: ImageMapped, decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
    objectStore.selectedImage = image;
  };

  const isDecadeActive = (decade: string): boolean => objectStore.selectedDecade === parseInt(decade);

  const isNested = (currentYear: string): boolean => currentYear.toString().includes('_');

  const getNested = (currentYear: string, images: ImageMapped[]): ImageMapped => {
    const image = images.find(({ year }) => year.includes(`${currentYear}_`));

    if (!image) {
      return null;
    }

    return image;
  };

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(data.images).map(([decade, images]) => {
          return (
            <Decade key={decade} active={isDecadeActive(decade)}>
              <DecadeValue onClick={(): void => changeSelectedDecade(decade)} active={isDecadeActive(decade)}>
                {decade}
              </DecadeValue>
              <Years>
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
              </Years>
            </Decade>
          );
        })}
      </Decades>
    </StyledTimeline>
  );
});
