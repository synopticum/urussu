import tokens, { Tokens } from './tokens';
import { CSSChunk } from 'src/components/GlobalStyle/theme/helpers';

const generateTheme = (tokens: Tokens): CSSChunk => {
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

const index = generateTheme(tokens);
export default index;
