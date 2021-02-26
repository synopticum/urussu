import { intl, Intl } from 'src/utils/intl';

const locale = {
  'Секунд прошло': 'Seconds passed',
};

const l: Intl<typeof locale> = key => intl(key, locale);
export default l;
