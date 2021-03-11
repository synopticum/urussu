import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Entity, mapStore } from 'src/stores/MapStore';
import ObjectPage from 'src/pages/MapPage/Map/EntityPage/ObjectPage';
import DotPage from 'src/pages/MapPage/Map/EntityPage/DotPage';
import PathPage from 'src/pages/MapPage/Map/EntityPage/PathPage';
import theme from 'src/features/App/GlobalStyle/theme';

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
  background-color: ${theme.colors.white.a};
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

const Pages: { dot: typeof DotPage; object: typeof ObjectPage; path: typeof ObjectPage; circle: typeof ObjectPage } = {
  dot: DotPage,
  object: ObjectPage,
  path: PathPage,
  circle: ObjectPage,
};

type Props = {
  entity: Entity;
};

export const EntityPage: React.FC<Props> = ({ entity }) => {
  if (!entity) {
    return null;
  }

  const close = (): void => {
    mapStore.setEntity(null);
  };

  const handleEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleEscape);

    return (): void => {
      document.removeEventListener('keyup', handleEscape);
      close();
    };
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
