import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';
import MapControls from 'src/components/MapControls';
import Aside from 'src/components/Aside';

const StyledMapPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => (
  <StyledMapPage>
    <Aside>
      <MapControls />
    </Aside>
    <Map />
  </StyledMapPage>
);

export default MapPage;
