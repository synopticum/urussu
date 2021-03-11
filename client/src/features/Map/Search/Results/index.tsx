import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import { DotItem, ObjectItem, PathItem } from 'src/features/Map/Search/Results/Item';
import { mapStore } from 'src/stores/MapStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledResults = styled.div`
  max-height: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
  ${theme.chunks.scrollbar(theme.colors.black.a, theme.colors.white.a)}
`;

const Results: React.FC = observer(() => {
  const {
    apiData: { data },
  } = mapStore;

  if (!data) {
    return null;
  }

  return (
    <StyledResults>
      {data.map(item => {
        switch (item.instanceType) {
          case 'dot':
            return <DotItem item={item as DotMapped} key={item.id} />;

          case 'object':
            return <ObjectItem item={item as ObjectMapped} key={item.id} />;

          case 'path':
            return <PathItem item={item as PathMapped} key={item.id} />;

          case 'circle':
            return <ObjectItem item={item as ObjectMapped} key={item.id} />;
        }

        return null;
      })}
    </StyledResults>
  );
});

export default Results;
