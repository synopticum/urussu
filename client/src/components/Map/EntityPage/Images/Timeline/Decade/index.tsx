import styled from 'styled-components';
import React from 'react';
import { objectStore } from 'src/stores';
import { color } from 'src/components/GlobalStyle/theme';
import { Years } from 'src/components/Map/EntityPage/Images/Timeline/Decade/Years';
import { ImageMapped } from 'src/stores/MapStore/EntitiesStore';
import { observer } from 'mobx-react-lite';

const StyledDecade = styled.li`
  position: relative;
  margin: 0 5px;
`;

const DecadeValue = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ isActive }): string => (isActive ? color('blue-1') : color('white-1'))};
  opacity: 0.3;
`;

type Props = {
  value: [string, ImageMapped[]];
};

export const Decade: React.FC<Props> = observer(({ value: [decade, images] }) => {
  const changeSelectedDecade = (decade: string): void => {
    objectStore.selectedDecade = parseInt(decade);
  };

  const isActive = (decade: string): boolean => objectStore.selectedDecade === parseInt(decade);

  return (
    <StyledDecade>
      <DecadeValue onClick={(): void => changeSelectedDecade(decade)} isActive={isActive(decade)}>
        {decade}
      </DecadeValue>
      <Years decade={decade} images={images} isActive={isActive(decade)} />
    </StyledDecade>
  );
});
