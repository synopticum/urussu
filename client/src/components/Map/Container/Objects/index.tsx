import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawObjects } from 'src/components/Map/Container/Objects/draw-objects';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';
import { mapStore } from 'src/stores/MapStore';

export const Objects: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchApiData();
    }

    return (): void => {
      // Возможно стоит оставлять эти данные в кеше
      // objectsStore.resetData();
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawObjects(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Objects;
