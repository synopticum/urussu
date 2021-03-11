import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/pages/MapPage/Map';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Aside from 'src/features/Page/Aside';

const StyledMapPage = styled(Page)``;

const MapPage: React.FC<RouteComponentProps> = () => {
  return (
    <StyledMapPage>
      <Map />
      <Aside />
    </StyledMapPage>
  );
};

export default MapPage;
