import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { mapStore } from 'src/stores/MapStore';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';

export const Circles: React.FC = observer(() => {
  const { isDataLoaded, data } = objectsStore.apiData;

  useEffect(() => {
    // Не нужно фетчить и сбрасывать, так как за это отвечает Objects
    if (mapStore.map && isDataLoaded) {
      objectsStore.drawCircles();
    }
  }, [mapStore.map, isDataLoaded, data]);

  return null;
});

export default Circles;
