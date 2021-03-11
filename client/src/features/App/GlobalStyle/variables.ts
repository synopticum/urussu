import { CSSChunk } from 'src/features/App/GlobalStyle/theme';
import tokens, { Tokens } from 'src/features/App/GlobalStyle/theme/tokens';

const _variables: string[] = [];

const handle = (entry: object, path = ''): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const [, value] = entry;

  if (typeof value === 'function') {
    return;
  }

  if (typeof value === 'object') {
    return Object.entries(value).forEach(entry => handle(entry, `${path}-${entry[0]}`));
  }

  _variables.push(`--${path}: ${value}`);
};

Object.entries(tokens).forEach(entry => handle(entry, entry[0]));
console.log(_variables);

const generateVariables = (tokens: Tokens): CSSChunk => {
  return `
  :root {
    ${_variables.join(';')}
  }
  `;
};

const variables = generateVariables(tokens);

export default variables;
