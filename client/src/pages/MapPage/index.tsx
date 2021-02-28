import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';

const StyledMapPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => (
  <StyledMapPage>
    <Map />
  </StyledMapPage>
);

export default MapPage;
