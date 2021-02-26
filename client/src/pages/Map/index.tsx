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
    <UMap />
  </MapWrapper>
);

export default Map;
