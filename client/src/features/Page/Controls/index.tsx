import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { controlsStore } from 'src/stores/ControlsStore';
import Button from 'src/features/Page/Controls/Button';
import UserMenu from 'src/features/Page/Controls/UserMenu';
import { authStore } from 'src/stores/AuthStore';

export const Control = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledControls = styled.aside`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1060;
  width: 60px;
  height: 100%;
  display: flex;
  padding: 23px 0 7px 23px;
`;

const UserButton = styled(Button)`
  order: 10;
  margin-top: auto;
`;

const login = (): void => {
  const redirectUrl = `${window.location.origin}/login`;
  const url = `https://oauth.vk.com/authorize?client_id=4447151&display=page&redirect_uri=${redirectUrl}&response_type=code&v=5.95`;

  window.location.href = url;
};

const Controls: React.FC = observer(({ children }) => {
  const ref = useRef(null);
  const { isLogged } = authStore;

  useEffect(() => {
    if (ref.current) {
      controlsStore.ref = ref;
    }

    return (): void => {
      controlsStore.resetData();
    };
  }, [ref.current]);

  return (
    <StyledControls>
      <Control ref={ref}>
        {children}
        {!isLogged ? <UserButton type="login" onClick={login} /> : <UserMenu />}
      </Control>
    </StyledControls>
  );
});

export default Controls;
