import { intl, Intl } from 'src/utils/intl';

const locale = {
  Карта: 'Map',
  Главная: 'Some page',
};

const l: Intl<typeof locale> = key => intl(key, locale);
export default l;
