import styled from 'styled-components';
import React from 'react';
import { DotMapped } from 'src/stores/MapStore/EntitiesStore/DotStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntitiesStore/ObjectStore/map';
import { PathMapped } from 'src/stores/MapStore/EntitiesStore/PathStore/map';
import dotIcon from './images/dot.svg';
import objectIcon from './images/object.svg';
import pathIcon from './images/path.svg';

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

export const DotItem: React.FC<{ item: DotMapped; open: (item: DotMapped) => void }> = ({ item, open }) => {
  const { title } = item;

  return (
    <StyledItem icon={dotIcon}>
      <Value onClick={(): void => open(item)}>{title}</Value>
    </StyledItem>
  );
};

export const ObjectItem: React.FC<{ item: ObjectMapped; open: (item: ObjectMapped) => void }> = ({ item, open }) => {
  const { street, house } = item;
  const override = { backgroundPosition: '5px calc(50% - 1px)' };

  return (
    <StyledItem icon={objectIcon} style={override}>
      <Value onClick={(): void => open(item)}>
        {street}, {house}
      </Value>
    </StyledItem>
  );
};

export const PathItem: React.FC<{ item: PathMapped; open: (item: PathMapped) => void }> = ({ item, open }) => {
  const { title } = item;
  const override = { backgroundPosition: '-5px 50%' };

  return (
    <StyledItem icon={pathIcon} style={override}>
      <Value onClick={(): void => open(item)}>{title}</Value>
    </StyledItem>
  );
};
