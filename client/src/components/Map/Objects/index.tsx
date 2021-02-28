import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawObjects } from 'src/components/Map/Objects/draw-objects';

const StyledObjects = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

export const Objects: React.FC = observer(() => {
  const { objectsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = objectsStore.apiData;

  useEffect(() => {
    if (!isDataLoaded) {
      objectsStore.fetchData();
    }
  }, []);

  useEffect(() => {
    if (isDataLoaded) drawObjects(mapStore.mapObject, data);
  }, [isDataLoaded]);

  return <StyledObjects>{/*<div>{isDataLoaded ? JSON.stringify(data) : 'test'}</div>*/}</StyledObjects>;
});

export default Objects;
