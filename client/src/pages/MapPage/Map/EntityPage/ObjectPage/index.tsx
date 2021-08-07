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
import { userStore } from 'src/stores/UserStore';
import { EntityId } from 'src/contracts/entities';
import { mapStore } from 'src/stores/MapStore';

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

const Arrow = styled.div`
  cursor: pointer;
  position: absolute;
  top: calc(50% - 8px);
  color: ${theme.colors.white.a};
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const Previous = styled(Arrow)`
  left: 30px;
`;

const Next = styled(Arrow)`
  right: 30px;
`;

const toggleComments = (): void => controlsStore.toggle('comments');

const toggleEditor = (): void => controlsStore.toggle('editor');

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

  const navigate = (id: EntityId): void => {
    objectStore.resetData();
    objectStore.initData(id);
    mapStore.setEntity({ type: 'object', id });
  };

  return (
    <StyledObjectPage>
      <Portal parent={globalStore.titleRef}>{objectStore.address || objectStore.title}</Portal>

      <Images />
      {objectStore.siblingsIds?.previous && (
        <Previous onClick={(): void => navigate(objectStore.siblingsIds.previous)}>Previous</Previous>
      )}
      {objectStore.siblingsIds?.next && <Next onClick={(): void => navigate(objectStore.siblingsIds.next)}>Next</Next>}

      {controlsStore.selected === 'comments' && (
        <Comments entityType="object" entityId={id} imageId={imagesStore.selectedImageId} />
      )}
      {controlsStore.selected === 'editor' && <Editor />}

      <Portal parent={controlsStore.ref}>
        <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
        {userStore.isAdmin && <Button type={controlsStore.getStateFor('editor')} onClick={toggleEditor} />}
      </Portal>
    </StyledObjectPage>
  );
});

export default ObjectPage;
