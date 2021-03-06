import React, { useEffect } from 'react';
import styled from 'styled-components';
import { imagesStore, objectStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import Images from 'src/components/Map/EntityPage/Images';

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
    </StyledObjectPage>
  );
});

export default ObjectPage;
