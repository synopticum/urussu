import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import fonts from 'src/components/GlobalStyle/fonts';
import theme from 'src/components/GlobalStyle/theme';
import overrides from 'src/components/GlobalStyle/overrides';

const globalStyle = createGlobalStyle`
  ${reset}
  ${fonts}
  ${theme}
  ${overrides}
`;

export default globalStyle;
