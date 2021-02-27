import React, { useCallback, useEffect } from 'react';
import { useStores } from 'src/stores';
import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression, Map as LeafletMap } from 'leaflet';
import styled from 'styled-components';
import { drawMap } from 'src/components/Map/draw-map';
import { observer } from 'mobx-react-lite';

const MapContainer = styled.div`
  cursor: grab;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  pointer-events: all;

  &:active {
    cursor: grabbing;
  }

  &::before,
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
  }

  /* shadow */
  &::before {
    box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
  }

  /* overlay */
  &::after {
    opacity: 0.05;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADAQMAAABs5if8AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjeMDQwNAAAAZmAeFpNQSMAAAAAElFTkSuQmCC');
  }
`;

export type Props = {
  width: number;
  height: number;
  minZoom: number;
  maxZoom: number;
  maxBounds: LatLngBoundsExpression;
};

const Debug = styled.div`
  position: absolute;
  right: calc(50% - 40px);
  top: 0;
  z-index: 999;
  background: #fff;
  color: #000000;
`;

const Map: React.FC<Props> = observer(props => {
  const { mapStore } = useStores();
  const { isFetching, error, data } = mapStore.apiDots;

  let mapRootNode: LeafletMap = null;
  const measuredRef = useCallback(node => {
    if (node !== null) mapRootNode = node;
  }, []);

  useEffect(() => {
    const init = async (): Promise<void> => {
      drawMap(mapRootNode, props);
      await mapStore.fetchData();
    };

    if (mapRootNode) init();
  }, [mapRootNode]);

  return (
    <div>
      {/*<Debug>*/}
      {/*  {JSON.stringify(isFetching)} {JSON.stringify(error)} {JSON.stringify(data)}*/}
      {/*</Debug>*/}
      <MapContainer id="map" ref={measuredRef} />
    </div>
  );
});

export default Map;
