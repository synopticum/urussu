import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawObjects } from 'src/features/Map/Container/Objects/draw-objects';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';
import { mapStore } from 'src/stores/MapStore';

export const Objects: React.FC = observer(() => {
  const { isDataLoaded, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchApiData();
    }

    return (): void => {
      // Cleaning up is made by <Map />
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawObjects(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Objects;
