import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/pages/MapPage/Map/EntityPage/Images';
import { dotStore } from 'src/stores/MapStore/EntityStore/DotStore';
import { controlsStore } from 'src/stores/ControlsStore';
import Comments from 'src/pages/MapPage/Map/EntityPage/Comments';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import Editor from 'src/pages/MapPage/Map/EntityPage/Editor';
import Portal from 'src/features/App/Portal';
import Button from 'src/features/Page/Controls/Button';
import { globalStore } from 'src/stores/GlobalStore';

const StyledDotPage = styled.div`
  height: 100%;
`;

const toggleComments = (): void => controlsStore.toggle('comments');

const toggleEditor = (): void => controlsStore.toggle('editor');

const closeActiveControls = (): void => controlsStore.toggle(controlsStore.selected);

type Props = {
  id: string;
};

export const DotPage: React.FC<Props> = observer(({ id }) => {
  const { data } = dotStore.apiData;

  useEffect(() => {
    dotStore.initData(id);

    return (): void => {
      dotStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledDotPage>
      <Portal parent={globalStore.titleRef}>{dotStore.title}</Portal>

      <Images onClick={closeActiveControls} />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="dot" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
        <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />
      </Portal>
    </StyledDotPage>
  );
});

export default DotPage;
