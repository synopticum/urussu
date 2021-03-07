import React, { useEffect } from 'react';
import styled from 'styled-components';
import { commentsStore, imagesStore, mapStore, objectStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import Images from 'src/components/Map/EntityPage/Images';
import Comments from 'src/components/Map/EntityPage/Comments';

const StyledObjectPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const ObjectPage: React.FC<Props> = observer(({ id }) => {
  const { data } = objectStore.apiData;
  const { controls } = mapStore;

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

  return (
    <StyledObjectPage>
      <Images />
      {controls.selected === 'comments' && <Comments type="object" id={id} />}
    </StyledObjectPage>
  );
});

export default ObjectPage;
