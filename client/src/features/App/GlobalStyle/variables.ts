import { CSSChunk } from 'src/features/App/GlobalStyle/theme';
import tokens, { Tokens } from 'src/features/App/GlobalStyle/theme/tokens';

const process = (entry: [string, unknown], path = ''): unknown => {
  const [, value] = entry;

  if (typeof value === 'function') {
    // Tokens may contain helper functions, which must not be added to CSS Variables
    return null;
  }

  if (typeof value === 'object') {
    // Tokens can be nested
    return Object.entries(value).flatMap(entry => process(entry, `${path}-${entry[0]}`));
  }

  return `--${path}: ${value}`;
};

const generateVariables = (tokens: Tokens): CSSChunk => {
  const variables = Object.entries(tokens)
    .flatMap(entry => process(entry, entry[0]))
    .filter(Boolean)
    .join(';');

  return `
    :root {
      ${variables}
    }
  `;
};

const variables = generateVariables(tokens);
export default variables;
