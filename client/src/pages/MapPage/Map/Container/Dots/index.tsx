import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawDots } from 'src/pages/MapPage/Map/Container/Dots/draw-dots';
import { dotsStore } from 'src/stores/MapStore/DotsStore';
import { mapStore } from 'src/stores/MapStore';

export const Dots: React.FC = observer(() => {
  const { isDataLoaded, data } = dotsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      dotsStore.fetchApiData();
    }

    return (): void => {
      // Cleaning up is made by <Map />
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawDots(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Dots;
