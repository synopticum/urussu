import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawObjects } from 'src/components/Map/Container/Objects/draw-objects';

export const Objects: React.FC = observer(() => {
  const { objectsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchData();
    }
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawObjects(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Objects;
