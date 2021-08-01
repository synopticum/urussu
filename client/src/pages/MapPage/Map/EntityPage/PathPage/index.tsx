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
import Button from 'src/features/Page/Controls/Button';
import { globalStore } from 'src/stores/GlobalStore';
import { userStore } from 'src/stores/UserStore';

const StyledPathPage = styled.div`
  height: 100%;
`;

const toggleComments = (): void => controlsStore.toggle('comments');

const toggleEditor = (): void => controlsStore.toggle('editor');

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

  return (
    <StyledPathPage>
      <Portal parent={globalStore.titleRef}>{pathStore.title}</Portal>

      <Images />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="path" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
        {userStore.isAdmin && <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />}
      </Portal>
    </StyledPathPage>
  );
});

export default PathPage;
