import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { drawPaths } from 'src/features/Map/Container/Paths/draw-paths';
import { pathsStore } from 'src/stores/MapStore/PathsStore';
import { mapStore } from 'src/stores/MapStore';

export const Paths: React.FC = observer(() => {
  const { isDataLoaded, data } = pathsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      pathsStore.fetchApiData();
    }

    return (): void => {
      // Cleaning up is made by <Map />
    };
  }, []);

  useEffect(() => {
    if (mapStore.map && isDataLoaded) drawPaths(mapStore.map, data);
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Paths;
