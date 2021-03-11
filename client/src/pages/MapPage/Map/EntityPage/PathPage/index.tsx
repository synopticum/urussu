import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/pages/MapPage/Map/EntityPage/Images';
import { pathStore } from 'src/stores/MapStore/EntityStore/PathStore';

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

  return (
    <StyledPathPage>
      <Images />
    </StyledPathPage>
  );
});

export default PathPage;
