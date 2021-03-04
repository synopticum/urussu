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

  const changeDecade = (decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
  };

  const isDecadeActive = (decade: string): boolean => objectStore.selectedDecade === parseInt(decade);

  const isNested = (year: string): boolean => year.includes('_');

  const getNested = (currentYear: string, images: ImageMapped[]): ImageMapped => {
    const image = images.find(([year]: [string, string]) => year.includes(`${currentYear}_`));

    if (!image) {
      return null;
    }

    return image[0].split('_')[1];
  };

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(data.images).map(([decade, images]) => {
          return (
            <Decade key={decade} active={isDecadeActive(decade)}>
              <DecadeValue onClick={(): void => changeDecade(decade)} active={isDecadeActive(decade)}>
                {decade}
              </DecadeValue>
              <Years>
                {images.map(([year, url]: [string, string]) => {
                  const nested = getNested(year, images);

                  return (
                    <Year key={year}>
                      {!isNested(year) && <YearValue>{year}</YearValue>}
                      {nested && <NestedYearValue>{nested}</NestedYearValue>}
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
