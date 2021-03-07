import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { mapStore } from 'src/stores';

const StyledControls = styled.div``;

export const Control = styled.div`
  position: relative;
`;

const Controls: React.FC = observer(({ children }) => {
  const { controls } = mapStore;
  const ref = useRef(null);

  // const toggleSearch = (): void => {
  //   if (!controls.selected) {
  //     controls.selected = 'search';
  //     return;
  //   }
  //
  //   mapStore.activeEntityId = null;
  //   controls.resetData();
  // };

  useEffect(() => {
    if (ref.current) {
      controls.ref = ref;
    }
  }, [ref.current]);

  return (
    <StyledControls ref={ref}>
      {children}
      {/*<Control>*/}
      {/*  <Button type={controls.selected === 'search' ? 'close' : 'search'} onClick={toggleSearch} />*/}
      {/*  {controls.selected === 'search' && <Search />}*/}
      {/*</Control>*/}
    </StyledControls>
  );
});

export default Controls;
