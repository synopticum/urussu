import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawCircles } from 'src/components/Map/Container/Circles/draw-circles';
import { mapStore } from 'src/stores/MapStore';
import { objectsStore } from 'src/stores/MapStore/EntitiesStore/ObjectsStore';

export const Circles: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawCircles(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Circles;
