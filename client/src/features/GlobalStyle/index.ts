import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import fonts from 'src/features/GlobalStyle/fonts';
import theme from 'src/features/GlobalStyle/theme';
import overrides from 'src/features/GlobalStyle/overrides';

const globalStyle = createGlobalStyle`
  ${reset}
  ${fonts}
  ${theme}
  ${overrides}
`;

export default globalStyle;
