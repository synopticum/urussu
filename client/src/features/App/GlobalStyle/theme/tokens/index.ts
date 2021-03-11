import colors from './colors';
import fonts from './fonts';
import shadows from './shadows';
import animations from './animations';
import chunks from './chunks';

const tokens = {
  colors,
  fonts,
  shadows,
  animations,
  chunks,
};

export type Tokens = typeof tokens;

export default tokens;
