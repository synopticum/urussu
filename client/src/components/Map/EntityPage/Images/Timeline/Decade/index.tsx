import styled from 'styled-components';
import React from 'react';
import { color } from 'src/components/GlobalStyle/theme';
import { Years } from 'src/components/Map/EntityPage/Images/Timeline/Decade/Years';
import { ImageMapped } from 'src/stores/MapStore/EntitiesStore';

const DecadeValue = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 5px 25px 8px 25px;
  color: ${({ isActive }): string => (isActive ? color('white-1') : color('black-2'))};
  font-size: 14px;
  border-bottom: 1px solid ${color('black-2')};
  transition: color 0.3s;
  user-select: none;

  &:hover {
    color: ${color('white-1')};
  }

  &::before {
    content: '';
    position: absolute;
    --size: 6px;
    left: calc(50% - var(--size) / 2);
    bottom: calc(var(--size) / -2);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background-color: ${({ isActive }): string => (isActive ? color('white-1') : color('black-2'))};
    transition: background-color 0.2s, transform 0.2s;
    transform: scale(${({ isActive }): string => (isActive ? '1.5' : '1')});
  }
`;

const StyledDecade = styled.li`
  position: relative;

  &:first-of-type ${DecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${color('black-1')}, ${color('black-2')});
  }

  &:last-of-type ${DecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, ${color('black-1')}, ${color('black-2')});
  }
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
      <DecadeValue onClick={change} isActive={isActive}>
        {decade}
      </DecadeValue>
      <Years images={images} isDecadeActive={isActive} />
    </StyledDecade>
  );
};
