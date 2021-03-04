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

const Decades = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Decade = styled.li`
  margin: 0 5px;
`;

const Years = styled.ul`
  display: none;
`;

const Year = styled.li``;

const Item = styled.div`
  cursor: pointer;
  background-color: ${color('white-1')};
  padding: 5px 10px;
  border-radius: 10px;
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

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(data.images).map(([decade, images]) => {
          return (
            <Decade key={decade}>
              <Item onClick={(): void => changeDecade(decade)}>
                {decade} {JSON.stringify(objectStore.selectedDecade === parseInt(decade))}
              </Item>
              <Years>
                {images.map((image: ImageMapped) => (
                  <Year key={image[1]}>{image[0]}</Year>
                ))}
              </Years>
            </Decade>
          );
        })}
      </Decades>
    </StyledTimeline>
  );
});
