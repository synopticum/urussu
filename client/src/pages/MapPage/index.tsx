import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';
import Controls from 'src/components/Map/Controls';
import Page from 'src/components/Page';
import Aside from 'src/components/Page/Aside';

const StyledMapPage = styled(Page)``;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => (
  <StyledMapPage>
    <Aside>
      <Controls />
    </Aside>
    <Map />
  </StyledMapPage>
);

export default MapPage;
