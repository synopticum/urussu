import React, { useEffect } from 'react';
import { dotsStore, mapStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawDots } from 'src/components/Map/Container/Dots/draw-dots';

export const Dots: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = dotsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      dotsStore.fetchApiData();
    }
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawDots(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Dots;
