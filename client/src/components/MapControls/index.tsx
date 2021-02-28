import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const StyledMapControls = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 600;
  width: 60px;
  height: 100%;
  background: var(--main-dark);
`;

const MapControls: React.FC = observer(() => {
  return <StyledMapControls>test</StyledMapControls>;
});

export default MapControls;
