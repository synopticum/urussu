import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { color } from 'src/components/GlobalStyle/theme';

const StyledMapControls = styled.div``;

const MapControls: React.FC = observer(() => {
  return <StyledMapControls>test</StyledMapControls>;
});

export default MapControls;
