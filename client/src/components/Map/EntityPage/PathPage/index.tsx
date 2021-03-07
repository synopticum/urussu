import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/components/Map/EntityPage/Images';
import { pathStore } from 'src/stores/MapStore/EntitiesStore/PathStore';
import { imagesStore } from 'src/stores/MapStore/EntitiesStore/ImagesStore';

const StyledPathPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const PathPage: React.FC<Props> = observer(({ id }) => {
  const { data } = pathStore.apiData;

  useEffect(() => {
    imagesStore.store = pathStore;
    pathStore.fetchApiData(id);

    return (): void => {
      imagesStore.resetData();
      pathStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledPathPage>
      <Images />
    </StyledPathPage>
  );
});

export default PathPage;
