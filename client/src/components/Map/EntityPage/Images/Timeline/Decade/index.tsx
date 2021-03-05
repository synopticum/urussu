import styled from 'styled-components';
import React from 'react';
import { color } from 'src/components/GlobalStyle/theme';
import { Years } from 'src/components/Map/EntityPage/Images/Timeline/Decade/Years';
import { ImageMapped } from 'src/stores/MapStore/EntitiesStore';

const StyledDecade = styled.li`
  position: relative;
  margin: 0 5px;
`;

const Value = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ isActive }): string => (isActive ? color('blue-1') : color('white-1'))};
  opacity: 0.3;
`;

type Props = {
  decade: string;
  images: ImageMapped[];
  change: () => void;
  isActive: boolean;
};

export const Decade: React.FC<Props> = ({ decade, images, change, isActive }) => {
  if (!images) {
    return null;
  }

  return (
    <StyledDecade>
      <Value onClick={change} isActive={isActive}>
        {decade}
      </Value>
      <Years decade={decade} images={images} isDecadeActive={isActive} />
    </StyledDecade>
  );
};
