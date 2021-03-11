import { CSSChunk } from 'src/features/GlobalStyle/theme';
import tokens, { Tokens } from 'src/features/GlobalStyle/theme/tokens';

const generateVariables = (tokens: Tokens): CSSChunk => {
  return `
  :root {
    ${Object.entries(tokens)
      .map(([groupName, groupValues]) => {
        return Object.entries(groupValues)
          .map(([name, value]) => {
            if (typeof value === 'object') {
              return Object.entries(value)
                .map(([nestedName, nestedValue]) => `--${groupName}-${name}-${nestedName}: ${nestedValue};\n`)
                .join('');
            }

            return `--${groupName}-${name}: ${value};\n`;
          })
          .join('');
      })
      .join('')}
  }
  `;
};

const variables = generateVariables(tokens);

export default variables;
