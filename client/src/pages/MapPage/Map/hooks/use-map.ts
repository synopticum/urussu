import { RefObject, useEffect } from 'react';
import { useRotatedMarker } from 'src/pages/MapPage/Map/hooks/use-rotated-marker';
import { mapStore } from 'src/stores/MapStore';

export const useMap = (containerRef: RefObject<HTMLDivElement>): void => {
  const { map } = mapStore;

  if (!mapStore.dotsRotated) {
    useRotatedMarker();
    mapStore.dotsRotated = true;
  }

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
