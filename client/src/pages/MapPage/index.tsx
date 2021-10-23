import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/pages/MapPage/Map';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Controls from 'src/features/Page/Controls';
import Content from 'src/features/Page/Content';

const StyledMapPage = styled(Page)``;

const MapPage: React.FC<RouteComponentProps> = () => {
  return (
    <Content>
      <div>
        <StyledMapPage>
          <Map />
          <Controls />
        </StyledMapPage>
      </div>
    </Content>
  );
};

export default MapPage;
