import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/features/Map';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Aside from 'src/features/Page/Aside';

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
