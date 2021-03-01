import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';
import MapControls from 'src/components/MapControls';
import { Page, Aside } from 'src/components/Page';

const StyledMapPage = styled(Page)``;

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
