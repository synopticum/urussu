import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawCircles } from 'src/features/Map/Container/Circles/draw-circles';
import { mapStore } from 'src/stores/MapStore';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';

export const Circles: React.FC = observer(() => {
  const { isDataLoaded, data } = objectsStore.apiData;

  useEffect(() => {
    // Не нужно фетчить и сбрасывать, так как за это отвечает Objects
    if (mapStore.map && isDataLoaded) {
      drawCircles(mapStore.map, data);
    }
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Circles;
