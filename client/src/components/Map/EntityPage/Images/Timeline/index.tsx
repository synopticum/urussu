import styled from 'styled-components';
import React from 'react';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import { objectStore } from 'src/stores';
import { Decade } from 'src/components/Map/EntityPage/Images/Timeline/Decade';
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

  const decades = Object.entries(data.images);

  return (
    <StyledTimeline>
      <Decades>
        {decades.map(([decade, images]) => (
          <Decade
            decade={decade}
            images={images}
            isActive={isActive(decade)}
            change={(): void => changeSelectedDecade(decade)}
            key={decade}
          />
        ))}
      </Decades>
    </StyledTimeline>
  );
});
