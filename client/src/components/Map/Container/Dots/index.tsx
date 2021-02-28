import React, { useEffect } from 'react';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawDots } from 'src/components/Map/Container/Dots/draw-dots';

export const Dots: React.FC = observer(() => {
  const { dotsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = dotsStore.apiData;

  useEffect(() => {
    dotsStore.fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) drawDots(mapStore.map, data);
  }, [isDataLoaded]);

  return null;
});

export default Dots;
