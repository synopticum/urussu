import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Button from 'src/components/Page/Aside/Button';

const StyledMapControls = styled.div``;

const MapControls: React.FC = observer(() => {
  return (
    <StyledMapControls>
      <Button type="search" />
    </StyledMapControls>
  );
});

export default MapControls;
