import styled from 'styled-components';
import React from 'react';
import { Years } from 'src/features/Map/EntityPage/Images/Timeline/Decade/Years';
import { ImageMapped } from 'src/stores/MapStore/EntityStore';
import theme from 'src/features/App/GlobalStyle/theme';

const DecadeValue = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }): string => (isActive ? 'default' : 'pointer')};
  padding: 5px 25px 8px 25px;
  color: ${({ isActive }): string => (isActive ? theme.colors.white.a : theme.colors.black.b)};
  font-size: 14px;
  border-bottom: 1px solid ${theme.colors.black.b};
  transition: color 0.3s;
  user-select: none;

  &:hover {
    color: ${theme.colors.white.a};
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
    background-color: ${({ isActive }): string => (isActive ? theme.colors.white.a : theme.colors.black.b)};
    transition: background-color 0.2s, transform 0.2s;
    transform: scale(${({ isActive }): string => (isActive ? '1.5' : '1')});
  }
`;

const StyledDecade = styled.li`
  position: relative;

  &:first-of-type ${DecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to right, ${theme.colors.black.a}, ${theme.colors.black.b});
  }

  &:last-of-type ${DecadeValue} {
    border-image-slice: 1;
    border-image-source: linear-gradient(to left, ${theme.colors.black.a}, ${theme.colors.black.b});
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
