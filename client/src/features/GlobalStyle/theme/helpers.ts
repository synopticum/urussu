import { ColorName, FontName, ShadowName } from 'src/features/GlobalStyle/theme/tokens';

export type CSSChunk = string;
export type CSSVariable = string;

export const color = (name: ColorName): CSSVariable => `var(--colors-${name})`;

export const font = (name: FontName): CSSVariable => `var(--fonts-${name})`;

export const shadow = (name: ShadowName): CSSVariable => `var(--shadows-${name})`;

export const animation = {
  bounce: (property: string, from: string, to: string): string => {
    return `
     @keyframes bounce {
        0%,
        100% {
          ${property}: ${from};
        }
        50% {
          ${property}: ${to};
        }
     }
    `;
  },
};

export const scrollbar = (baseColor: CSSVariable, secondaryColor: CSSVariable): CSSChunk => {
  return `
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track {
      overflow: hidden;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border: 10px solid ${secondaryColor};
      border-top: 0;
      border-bottom: 0;
      transition: background 0.25s;
      background: ${baseColor};
    }

    &::-webkit-scrollbar:horizontal {
      height: 24px;
    }

    &::-webkit-scrollbar:vertical {
      width: 24px;
    }

    &::-webkit-scrollbar-thumb:horizontal {
      border-left: none;
      border-right: none;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${baseColor};
    }
  `;
};
