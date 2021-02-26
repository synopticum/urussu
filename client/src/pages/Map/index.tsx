import React from 'react';
import { RouteComponentProps } from '@reach/router';
import UMap from 'src/components/UMap';
import styled from 'styled-components';

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {} & RouteComponentProps;

const Map: React.FC<Props> = () => (
  <MapWrapper>
    <UMap
      width={10000}
      height={6250}
      minZoom={4}
      maxZoom={6}
      maxBounds={[
        [39.5, -180],
        [100, 39.5],
      ]}
    />
  </MapWrapper>
);

export default Map;
