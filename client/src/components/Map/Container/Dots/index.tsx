import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawDots } from 'src/components/Map/Container/Dots/draw-dots';
import { dotsStore } from 'src/stores/MapStore/EntitiesStore/DotsStore';
import { mapStore } from 'src/stores/MapStore';

export const Dots: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = dotsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      dotsStore.fetchApiData();
    }

    return (): void => {
      // Возможно стоит оставлять эти данные в кеше
      // dotsStore.resetData();
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawDots(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Dots;
