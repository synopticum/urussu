import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { getColor } from 'src/components/GlobalStyle/theme';

const StyledMapControls = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 600;
  width: 60px;
  height: 100%;
  background: ${getColor('black-1')};
`;

const MapControls: React.FC = observer(() => {
  return <StyledMapControls>test</StyledMapControls>;
});

export default MapControls;
