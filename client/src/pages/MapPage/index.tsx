import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';
import MapControls from 'src/components/Map/MapControls';

const StyledMapPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapBorder = styled.div`
  --inner-border: 15px;
  pointer-events: none;
  position: absolute;
  left: 65px;
  top: 0;
  z-index: 500;
  width: calc(100% - 50px - var(--inner-border) * 2);
  height: calc(100% - 30px);
  margin: 15px 15px 15px 0;
  box-sizing: border-box;
  background: transparent;
  border-radius: 10px;
  box-shadow: rgb(17 17 17) 0 0 0 10px;
  outline: var(--inner-border) solid #111;
`;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => (
  <StyledMapPage>
    <MapControls />
    <MapBorder />
    <Map />
  </StyledMapPage>
);

export default MapPage;
