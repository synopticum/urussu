import styled from 'styled-components';
import React from 'react';
import { Decade } from 'src/features/Map/EntityPage/Images/Timeline/Decade';
import { EmptyDecade } from 'src/features/Map/EntityPage/Images/Timeline/EmptyDecade';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

const StyledTimeline = styled.div`
  position: absolute;
  left: 0;
  bottom: -54px;
  width: 100%;
`;

const Decades = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Timeline = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!data.images) {
    return null;
  }

  imagesStore.selectedDecade = imagesStore.selectedDecade || imagesStore.initialDecade;

  const timeline = imagesStore.createTimeline(data.images);

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(timeline).map(([decade, images]) => {
          if (!images) {
            return <EmptyDecade key={decade}>{decade}</EmptyDecade>;
          }

          const changeSelectedDecade = (): void => imagesStore.changeSelectedDecade(decade);

          return (
            <Decade
              decade={decade}
              images={images}
              isActive={imagesStore.isDecadeActive(decade)}
              change={changeSelectedDecade}
              key={decade}
            />
          );
        })}
      </Decades>
    </StyledTimeline>
  );
});
