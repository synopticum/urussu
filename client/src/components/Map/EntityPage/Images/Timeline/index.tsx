import styled from 'styled-components';
import React from 'react';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { objectStore } from 'src/stores';
import { Decade } from 'src/components/Map/EntityPage/Images/Timeline/Decade';
import { EmptyDecade } from 'src/components/Map/EntityPage/Images/Timeline/EmptyDecade';
import { observer } from 'mobx-react-lite';

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
  const { data } = objectStore.apiData;

  if (!data.images) {
    return null;
  }

  objectStore.selectedDecade = objectStore.selectedDecade || objectStore.initialDecade;

  const changeSelectedDecade = (decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
  };

  const isActive = (decade: string): boolean => objectStore.selectedDecade === parseInt(decade);

  const timeline = createTimeline(data.images);

  return (
    <StyledTimeline>
      <Decades>
        {Object.entries(timeline).map(([decade, images]) => {
          if (!decade || !images) {
            return <EmptyDecade>{decade}</EmptyDecade>;
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
