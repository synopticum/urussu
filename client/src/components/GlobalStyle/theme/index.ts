import tokens from './tokens';

type Tokens = typeof tokens;
type ColorName = keyof typeof tokens.colors;
type FontName = keyof typeof tokens.fonts;
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

const index = generateTheme(tokens);
export default index;
