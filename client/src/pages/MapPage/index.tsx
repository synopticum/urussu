import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Map from 'src/components/Map';
import styled from 'styled-components';

const StyledMapPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    --inner-border: 15px;
    content: '';
    pointer-events: none;
    position: absolute;
    left: 65px;
    top: 0px;
    z-index: 1000;
    width: calc(100% - 50px - var(--inner-border) * 2);
    height: calc(100% - 30px);
    margin: 15px 15px 15px 0;
    box-sizing: border-box;
    background: transparent;
    border-radius: 10px;
    box-shadow: rgb(17 17 17) 0 0 0 10px;
    outline: var(--inner-border) solid #111;
  }
`;

type Props = {} & RouteComponentProps;

const MapPage: React.FC<Props> = () => (
  <StyledMapPage>
    <Map />
  </StyledMapPage>
);

export default MapPage;
