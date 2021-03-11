import tokens, { Tokens } from 'src/features/GlobalStyle/theme/tokens';

type Theme = Partial<Tokens>;

export type CSSChunk = string;
export type CSSVariable = string;

const generateGetters = <T>(groupName: string, groupSource: T): T => {
  const groupSourceWithGetters = JSON.parse(JSON.stringify(groupSource));

  Object.entries(groupSourceWithGetters).forEach(([group, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([name, nestedValue]) => {
        Object.defineProperty(value, name, {
          get(): string {
            return `var(--${groupName}-${group}-${name})`;
          },
        });
      });
    }

    return `var(--${groupName}-${value})`;
  });

  return groupSourceWithGetters;
};

const generateTheme = (tokens: Tokens): Theme => {
  const theme: Theme = {};
  const entries = Object.entries(tokens);
  const skip = ['animations', 'chunks'];

  for (const group of entries) {
    const [name, value] = group;

    if (skip.includes(name)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      theme[name] = value;
      continue;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    theme[name] = generateGetters(name, value);
  }

  return theme;
};

const theme = generateTheme(tokens);
export default theme;
