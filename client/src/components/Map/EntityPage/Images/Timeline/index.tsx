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
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ active }): string => (active ? color('blue-1') : color('white-1'))};
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
                {images.map((image: ImageMapped) => (
                  <Year key={image[1]}>
                    <YearValue>{image[0]}</YearValue>
                  </Year>
                ))}
              </Years>
            </Decade>
          );
        })}
      </Decades>
    </StyledTimeline>
  );
});
