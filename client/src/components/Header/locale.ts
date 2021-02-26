import { intl, Intl } from 'src/utils/intl';

const locale = {
  'О компании': 'About',
  Карта: 'Карта',
};

const l: Intl<typeof locale> = key => intl(key, locale);
export default l;
