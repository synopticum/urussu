import { RefObject, useEffect } from 'react';
import { useRotatedMarker } from 'src/pages/MapPage/Map/hooks/use-rotated-marker';
import { mapStore } from 'src/stores/MapStore';

export const useMap = (containerRef: RefObject<HTMLDivElement>): void => {
  const { map } = mapStore;
  useRotatedMarker();

  useEffect(() => {
    if (containerRef.current && !map) {
      mapStore.draw(containerRef.current);
    }

    return (): void => {
      if (map) {
        mapStore.map = null;
      }
    };
  }, [containerRef.current, map]);
};
