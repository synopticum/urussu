import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';
import Page from 'src/components/Page';
import Aside from 'src/components/Page/Aside';

const StyledMapPage = styled(Page)``;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => {
  return (
    <StyledMapPage>
      <Map />
      <Aside />
    </StyledMapPage>
  );
};

export default MapPage;
