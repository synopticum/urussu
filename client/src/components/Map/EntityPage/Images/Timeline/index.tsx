import styled from 'styled-components';
import React from 'react';
import { Decade } from 'src/components/Map/EntityPage/Images/Timeline/Decade';
import { EmptyDecade } from 'src/components/Map/EntityPage/Images/Timeline/EmptyDecade';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';

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

const createTimeline = (images: ImagesMapped): ImagesMapped => {
  const DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];
  const timeline: ImagesMapped = {};
  const decades = Object.entries(images);

  DECADES.forEach(decade => (timeline[decade] = null));

  decades.forEach(([decade, images]) => {
    timeline[parseInt(decade)] = images;
  });

  return timeline;
};

type Props = {};

export const Timeline: React.FC<Props> = observer(() => {
  const { store } = imagesStore;
  const { data } = store.apiData;

  if (!data.images) {
    return null;
  }

  imagesStore.selectedDecade = imagesStore.selectedDecade || imagesStore.initialDecade;

  const changeSelectedDecade = (decade: string): void => {
    imagesStore.selectedDecade = parseInt(decade);
  };

  const isActive = (decade: string): boolean => imagesStore.selectedDecade === parseInt(decade);

  const timeline = createTimeline(data.images);

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(timeline).map(([decade, images]) => {
          if (!images) {
            return <EmptyDecade key={decade}>{decade}</EmptyDecade>;
          }

          return (
            <Decade
              decade={decade}
              images={images}
              isActive={isActive(decade)}
              change={(): void => changeSelectedDecade(decade)}
              key={decade}
            />
          );
        })}
      </Decades>
    </StyledTimeline>
  );
});
