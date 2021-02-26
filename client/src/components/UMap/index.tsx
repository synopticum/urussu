import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngBoundsExpression } from 'leaflet';
import styled from 'styled-components';
import { drawMap } from 'src/components/UMap/draw-map';

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
  height: 6250;
  minZoom: number;
  maxZoom: number;
  maxBounds: LatLngBoundsExpression;
};

const UMap: React.FC<Props> = props => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      drawMap(mapRef.current, props);
    }
  }, [mapRef.current]);

  return <MapContainer id="map" ref={mapRef} />;
};

export default UMap;
