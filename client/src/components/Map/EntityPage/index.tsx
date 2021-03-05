import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Entity } from 'src/stores/MapStore';
import ObjectPage from 'src/components/Map/EntityPage/ObjectPage';
import { mapStore } from 'src/stores';
import { color } from 'src/components/GlobalStyle/theme';

const StyledEntityPage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
`;

const Wrapper = styled.div`
  position: absolute;
  left: 75px;
  top: 25px;
  width: calc(100% - 100px);
  height: calc(100% - 50px);
  border-radius: 10px;
  background-color: ${color('white-1')};
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url('/images/common/close.svg') no-repeat 50% 50% #fff;
  background-size: 20px;
`;

const Pages: { dot: typeof ObjectPage; object: typeof ObjectPage; path: typeof ObjectPage } = {
  dot: ObjectPage,
  object: ObjectPage,
  path: ObjectPage,
};

type Props = {
  entity: Entity;
};

export const EntityPage: React.FC<Props> = ({ entity }) => {
  if (!entity) {
    return null;
  }

  const close = (): void => mapStore.setEntity(null);

  useEffect(() => {
    return (): void => close();
  }, []);

  const Page = Pages[entity.type];

  return (
    <StyledEntityPage>
      <Wrapper>
        <Close onClick={close} />
        <Page id={entity.id} />
      </Wrapper>
    </StyledEntityPage>
  );
};

export default EntityPage;
