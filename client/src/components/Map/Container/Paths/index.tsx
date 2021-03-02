import React, { useEffect } from 'react';
import { pathsStore, mapStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawPaths } from 'src/components/Map/Container/Paths/draw-paths';

export const Paths: React.FC = observer(() => {
  const { isFetching, isDataLoaded, error, data } = pathsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      pathsStore.fetchApiData();
    }
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawPaths(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Paths;
