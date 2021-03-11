import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
import fonts from 'src/features/App/GlobalStyle/fonts';
import variables from 'src/features/App/GlobalStyle/variables';
import overrides from 'src/features/App/GlobalStyle/overrides';

const globalStyle = createGlobalStyle`
  ${reset}
  ${fonts}
  ${variables}
  ${overrides}
`;

export default globalStyle;
