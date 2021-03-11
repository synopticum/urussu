import tokens, { Tokens } from 'src/features/App/GlobalStyle/theme/tokens';
import cloneDeep from 'clone-deep';

type Theme = Tokens;
export type CSSChunk = string;
export type CSSVariable = string;

const generateTheme = (tokens: Tokens): Theme => {
  const theme: Theme = cloneDeep(tokens);

  const process = (entry: [string, unknown], parent?: unknown, path?: string): void => {
    const [name, value] = entry;

    if (typeof value === 'function') {
      // Tokens may contain helper functions, which must not be converted to getter
      return;
    }

    if (typeof value === 'object') {
      // Tokens can be nested
      for (const entry of Object.entries(value)) {
        process(entry, value, `${path}-${entry[0]}`);
      }
      return;
    }

    Object.defineProperty(parent, name, {
      get(): string {
        return `var(--${path})`;
      },
    });
  };

  for (const entry of Object.entries(theme)) {
    process(entry, null, entry[0]);
  }

  return theme;
};

const theme = generateTheme(tokens);
export default theme;
