import React, { useEffect } from 'react';
import styled from 'styled-components';
import { dotStore, imagesStore } from 'src/stores';
import { observer } from 'mobx-react-lite';
import Images from 'src/components/Map/EntityPage/Images';

const StyledDotPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const DotPage: React.FC<Props> = observer(({ id }) => {
  const { data } = dotStore.apiData;

  useEffect(() => {
    imagesStore.store = dotStore;
    dotStore.fetchApiData(id);

    return (): void => {
      imagesStore.resetData();
      dotStore.resetData();
    };
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledDotPage>
      <Images />
    </StyledDotPage>
  );
});

export default DotPage;
