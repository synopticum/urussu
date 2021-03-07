import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawPaths } from 'src/components/Map/Container/Paths/draw-paths';
import { pathsStore } from 'src/stores/MapStore/EntitiesStore/PathsStore';
import { mapStore } from 'src/stores/MapStore';

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
