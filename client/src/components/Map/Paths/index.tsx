import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawPaths } from 'src/components/Map/Paths/draw-paths';

export const Paths: React.FC = observer(() => {
  const { pathsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = pathsStore.apiData;

  useEffect(() => {
    pathsStore.fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) drawPaths(mapStore.mapObject, data);
  }, [isDataLoaded]);

  return null;
});

export default Paths;
