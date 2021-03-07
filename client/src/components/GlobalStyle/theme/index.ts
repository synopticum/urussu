import tokens from './tokens';

type Tokens = typeof tokens;
type ColorName = keyof typeof tokens.colors;
type FontName = keyof typeof tokens.fonts;
type ShadowName = keyof typeof tokens.shadows;
type CSSVariable = string;

const generateTheme = (tokens: Tokens): string => {
  return `
  :root {
    ${Object.entries(tokens)
      .map(([groupName, groupValues]) =>
        Object.entries(groupValues)
          .map(([name, value]) => `--${groupName}-${name}: ${value};\n`)
          .join(''),
      )
      .join('')}
  }
  `;
};

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

const index = generateTheme(tokens);
export default index;
