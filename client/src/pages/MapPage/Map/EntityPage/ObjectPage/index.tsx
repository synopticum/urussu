import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/pages/MapPage/Map/EntityPage/Images';
import Comments from 'src/pages/MapPage/Map/EntityPage/Comments';
import Portal from 'src/features/App/Portal';
import Button from 'src/features/Page/Controls/Button';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { controlsStore } from 'src/stores/ControlsStore';
import Editor from 'src/pages/MapPage/Map/EntityPage/Editor';
import theme from 'src/features/App/GlobalStyle/theme';
import { globalStore } from 'src/stores/GlobalStore';

const StyledObjectPage = styled.div`
  height: 100%;
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  top: -50px;
  font-size: 32px;
  margin-right: auto;
  color: ${theme.colors.white.a};
`;

const toggleComments = (): void => controlsStore.toggle('comments');

const toggleEditor = (): void => controlsStore.toggle('editor');

const closeActiveControls = (): void => controlsStore.toggle(controlsStore.selected);

type Props = {
  id: string;
};

export const ObjectPage: React.FC<Props> = observer(({ id }) => {
  const { data } = objectStore.apiData;

  useEffect(() => {
    objectStore.initData(id);

    return (): void => {
      objectStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledObjectPage>
      <Portal parent={globalStore.titleRef}>{objectStore.address || objectStore.title}</Portal>

      <Images onClick={closeActiveControls} />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="object" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
        <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />
      </Portal>
    </StyledObjectPage>
  );
});

export default ObjectPage;
