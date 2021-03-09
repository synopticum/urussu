import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/features/Map/EntityPage/Images';
import Comments from 'src/features/Map/EntityPage/Comments';
import Portal from 'src/features/App/Portal';
import Button from 'src/components/Page/Aside/Button';
import { Control } from 'src/components/Page/Aside';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';
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
    objectStore.initData(id);

    return (): void => {
      objectStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  const toggleComments = (): void => controlsStore.toggle('comments');

  return (
    <StyledObjectPage>
      <Images />
      {controlsStore.selected === 'comments' && (
        <Comments entityType="object" entityId={id} imageId={imagesStore.selectedImageId} />
      )}

      <Portal parent={controlsStore.ref}>
        <Control>
          <Button type={controlsStore.getStateFor('comments')} onClick={toggleComments} />
        </Control>
      </Portal>
    </StyledObjectPage>
  );
});

export default ObjectPage;
