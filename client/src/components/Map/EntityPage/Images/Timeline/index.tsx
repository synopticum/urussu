import React from 'react';
import { ImagesMapped } from 'src/stores/MapStore/EntitiesStore';
import styled from 'styled-components';

const StyledTimeline = styled.div`
  position: absolute;
  left: 50%;
  bottom: 50px;
  background-color: #ffffff;
  padding: 10px;
`;

export const Timeline: React.FC<{ images: ImagesMapped }> = ({ images }) => {
  if (!images) {
    return null;
  }

  return (
    <StyledTimeline>
      {/*{Object.entries(images).map(([year, url]) => (*/}
      {/*  <div key={url}>{year}</div>*/}
      {/*))}*/}
      {JSON.stringify(images)}
    </StyledTimeline>
  );
};
