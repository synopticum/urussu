import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStores } from 'src/stores';
import { observer } from 'mobx-react-lite';
import { drawDots } from 'src/components/Map/Dots/draw-dots';

const StyledDots = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

export const Dots: React.FC = observer(() => {
  const { dotsStore, mapStore } = useStores();
  const { isFetching, isDataLoaded, error, data } = dotsStore.apiData;

  useEffect(() => {
    dotsStore.fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) drawDots(mapStore.mapObject, data);
  }, [isDataLoaded]);

  return <StyledDots>{/*<div>{isDataLoaded ? JSON.stringify(data) : 'test'}</div>*/}</StyledDots>;
});

export default Dots;
