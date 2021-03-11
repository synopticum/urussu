import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import fonts from 'src/features/GlobalStyle/fonts';
import variables from 'src/features/GlobalStyle/variables';
import overrides from 'src/features/GlobalStyle/overrides';

const globalStyle = createGlobalStyle`
  ${reset}
  ${fonts}
  ${variables}
  ${overrides}
`;

export default globalStyle;
