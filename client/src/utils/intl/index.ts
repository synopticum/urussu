import { globalStore } from 'src/stores/GlobalStore';

export type Intl<T> = (key: keyof T) => unknown;

export function intl<T, K extends keyof T>(key: K, obj: T): unknown {
  if (globalStore.language === 'ru') {
    return key;
  } else if (globalStore.language === 'en') {
    return obj[key];
  } else {
    return '';
  }
}
