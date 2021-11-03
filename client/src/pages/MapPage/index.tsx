import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/pages/MapPage/Map';
import styled from 'styled-components';
import Controls from 'src/features/Page/Controls';

const StyledMapPage = styled.div``;

const MapPage: React.FC<RouteComponentProps> = () => {
  return (
    <StyledMapPage>
      <Map />
      <Controls />
    </StyledMapPage>
  );
};

export default MapPage;
