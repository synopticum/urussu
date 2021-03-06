import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Button from 'src/components/Page/Aside/Button';
import Search from 'src/components/Map/Controls/Search';
import { mapStore } from 'src/stores';

const StyledControls = styled.div``;

const Control = styled.div`
  position: relative;
`;

const Controls: React.FC = observer(() => {
  const { controls } = mapStore;

  const toggleSearch = (): void => {
    if (!controls.selected) {
      controls.selected = 'search';
      return;
    }

    controls.resetData();
  };

  return (
    <StyledControls>
      <Control>
        <Button type={controls.selected === 'search' ? 'close' : 'search'} onClick={toggleSearch} />
        {controls.selected === 'search' && <Search />}
      </Control>
    </StyledControls>
  );
});

export default Controls;
