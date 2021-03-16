import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/pages/MapPage/Map/EntityPage/Images';
import { pathStore } from 'src/stores/MapStore/EntityStore/PathStore';
import { controlsStore } from 'src/stores/ControlsStore';
import Comments from 'src/pages/MapPage/Map/EntityPage/Comments';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import Editor from 'src/pages/MapPage/Map/EntityPage/Editor';
import Portal from 'src/features/App/Portal';
import { Control } from 'src/features/Page/Aside';
import Button from 'src/features/Page/Aside/Button';

const StyledPathPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const PathPage: React.FC<Props> = observer(({ id }) => {
  const { data } = pathStore.apiData;

  useEffect(() => {
    pathStore.initData(id);

    return (): void => {
      pathStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  const toggleComments = (): void => controlsStore.toggle('comments');
  const toggleEditor = (): void => controlsStore.toggle('editor');

  return (
    <StyledPathPage>
      <Images />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="path" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Control>
          <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
          <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />
        </Control>
      </Portal>
    </StyledPathPage>
  );
});

export default PathPage;
