import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from '@repo/translation/en/common.json';
import taskEn from '@repo/translation/en/task.json';

const resources = {
  en: {
    common: commonEn,
    task: taskEn,
  },
};

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- required by library
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: (typeof resources)['en'];
  }
}

use(initReactI18next).init({
  lng: 'en',
  debug: false,
  resources,
});
