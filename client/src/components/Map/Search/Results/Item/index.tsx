import styled from 'styled-components';
import React from 'react';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import dotIcon from './images/dot.svg';
import objectIcon from './images/object.svg';
import pathIcon from './images/path.svg';
import { mapStore } from 'src/stores/MapStore';

const StyledItem = styled.div<{ icon: string }>`
  padding: 7px 10px 7px 30px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  background: ${({ icon }): string => `url(${icon}) 5px 50% no-repeat`};
  border-radius: 5px;

  &:hover {
    background-color: #eee;
  }
`;

const Value = styled.span`
  cursor: pointer;
`;

export const DotItem: React.FC<{ item: DotMapped }> = ({ item }) => {
  const { title } = item;

  return (
    <StyledItem icon={dotIcon}>
      <Value onClick={(): void => mapStore.openDot(item)}>{title}</Value>
    </StyledItem>
  );
};

export const ObjectItem: React.FC<{ item: ObjectMapped }> = ({ item }) => {
  const { street, house } = item;
  const override = { backgroundPosition: '5px calc(50% - 1px)' };

  return (
    <StyledItem icon={objectIcon} style={override}>
      <Value onClick={(): void => mapStore.openObject(item)}>
        {street}, {house}
      </Value>
    </StyledItem>
  );
};

export const PathItem: React.FC<{ item: PathMapped }> = ({ item }) => {
  const { title } = item;
  const override = { backgroundPosition: '-5px 50%' };

  return (
    <StyledItem icon={pathIcon} style={override}>
      <Value onClick={(): void => mapStore.openPath(item)}>{title}</Value>
    </StyledItem>
  );
};
