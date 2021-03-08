import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { controlsStore } from 'src/stores/ControlsStore';
import { color } from 'src/components/GlobalStyle/theme/helpers';

export const Control = styled.div`
  position: relative;
`;

const StyledAside = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1060;
  width: 60px;
  height: 100%;
  background: ${color('black-1')};
  display: flex;
  padding: 23px 0 0 10px;
`;

const Aside: React.FC = observer(({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      controlsStore.ref = ref;
    }

    return (): void => {
      controlsStore.resetData();
    };
  }, [ref.current]);

  return <StyledAside ref={ref}>{children}</StyledAside>;
});

export default Aside;
