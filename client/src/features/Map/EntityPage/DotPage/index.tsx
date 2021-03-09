import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Images from 'src/features/Map/EntityPage/Images';
import { dotStore } from 'src/stores/MapStore/EntityStore/DotStore';

const StyledDotPage = styled.div`
  height: 100%;
`;

type Props = {
  id: string;
};

export const DotPage: React.FC<Props> = observer(({ id }) => {
  const { data } = dotStore.apiData;

  useEffect(() => {
    dotStore.initData(id);

    return (): void => {
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
