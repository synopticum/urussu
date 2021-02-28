import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawCircles } from 'src/components/Map/Container/Circles/draw-circles';

const StyledCircles = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

export const Circles: React.FC = observer(() => {
  const { objectsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchData();
    }
  }, []);

  useEffect(() => {
    if (isDataLoaded) drawCircles(mapStore.mapObject, data);
  }, [isDataLoaded]);

  return null;
});

export default Circles;
