import styled from 'styled-components';
import React from 'react';
import { Decade } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline/Decade';
import { EmptyDecade } from 'src/pages/MapPage/Map/EntityPage/Images/Timeline/EmptyDecade';
import { observer } from 'mobx-react-lite';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledTimeline = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 70px;
  background-color: ${theme.colors.black.a};
`;

const Decades = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 13px;
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
