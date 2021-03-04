import React, { useEffect } from 'react';
import styled from 'styled-components';
import { objectStore } from 'src/stores';
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
    objectStore.fetchApiData(id);

    return (): void => objectStore.resetData();
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledObjectPage>
      {/*{data.thumbnail && <img src={data.thumbnail} alt="" />}*/}
      {/*<div>{data.title}</div>*/}
      {/*<div>{data.shortDescription}</div>*/}
      <Images images={data.images} initialImage={objectStore.initialImage} />
      <div>
        {/*{data.images &&*/}
        {/*  Object.entries(data.images).map(([year, url]) => (*/}
        {/*    <div key={url}>*/}
        {/*      {year} - {url}*/}
        {/*    </div>*/}
        {/*  ))}*/}
      </div>
    </StyledObjectPage>
  );
});

export default ObjectPage;
