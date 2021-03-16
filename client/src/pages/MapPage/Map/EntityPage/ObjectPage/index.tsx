import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/pages/MapPage/Map/EntityPage/Images';
import Comments from 'src/pages/MapPage/Map/EntityPage/Comments';
import Portal from 'src/features/App/Portal';
import Button from 'src/features/Page/Aside/Button';
import { Control } from 'src/features/Page/Aside';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
import { controlsStore } from 'src/stores/ControlsStore';
import Editor from 'src/pages/MapPage/Map/EntityPage/Editor';

const StyledObjectPage = styled.div`
  height: 100%;
`;

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

  const toggleComments = (): void => controlsStore.toggle('comments');
  const toggleEditor = (): void => controlsStore.toggle('editor');

  return (
    <StyledObjectPage>
      <Images />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="object" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Control>
          <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
          <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />
        </Control>
      </Portal>
    </StyledObjectPage>
  );
});

export default ObjectPage;
