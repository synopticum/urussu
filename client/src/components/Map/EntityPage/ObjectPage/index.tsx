import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/components/Map/EntityPage/Images';
import Comments from 'src/components/Map/EntityPage/Comments';
import Portal from 'src/components/App/Portal';
import Button from 'src/components/Page/Aside/Button';
import { Control } from 'src/components/Page/Aside';
import { objectStore } from 'src/stores/MapStore/EntitiesStore/ObjectStore';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';
import { commentsStore } from 'src/stores/MapStore/EntitiesStore/CommentsStore';
import { controlsStore } from 'src/stores/ControlsStore';

const StyledObjectPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const ObjectPage: React.FC<Props> = observer(({ id }) => {
  const { data } = objectStore.apiData;

  useEffect(() => {
    imagesStore.store = objectStore;
    commentsStore.store = objectStore;
    objectStore.fetchApiData(id);

    return (): void => {
      imagesStore.resetData();
      objectStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  const toggleComments = (): void => {
    if (!controlsStore.selected) {
      controlsStore.selected = 'comments';
      return;
    }

    controlsStore.resetData();
  };

  return (
    <StyledObjectPage>
      <Images />
      {controlsStore.selected === 'comments' && <Comments type="object" id={id} />}

      <Portal parent={controlsStore.ref}>
        <Control>
          <Button type={controlsStore.selected === 'comments' ? 'close' : 'comments'} onClick={toggleComments} />
        </Control>
      </Portal>
    </StyledObjectPage>
  );
});

export default ObjectPage;
