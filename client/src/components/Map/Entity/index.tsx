import React from 'react';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import { entityStore } from 'src/stores';

const StyledEntity = styled.div`
  position: absolute;
  left: 75px;
  top: 25px;
  width: calc(100% - 100px);
  height: calc(100% - 50px);
  border-radius: 10px;
  z-index: 550;
  background-color: ${color('white-1')};
  padding: 50px;
  overflow-y: auto;
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 0;
  width: 20px;
  height: 20px;
  background: url('/images/common/close.svg') no-repeat 50% 50%;
  background-size: 20px;
`;

type Props = {};

export const Entity: React.FC<Props> = () => {
  const { data } = entityStore.apiData;

  const close = (): void => entityStore.resetData();

  return (
    <StyledEntity>
      {JSON.stringify(data)}, <Close onClick={close} />
    </StyledEntity>
  );
};

export default Entity;
