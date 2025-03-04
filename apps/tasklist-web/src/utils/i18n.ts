import { use } from 'i18next';
import { makeZodI18nMap } from 'zod-i18n-map';
import { setErrorMap } from 'zod';
import { initReactI18next } from 'react-i18next';
import commonEn from '@repo/translation/en/common.json';
import errorsEn from '@repo/translation/en/errors.json';
import taskEn from '@repo/translation/en/task.json';
import authEn from '@repo/translation/en/auth.json';
import zodEn from 'zod-i18n-map/locales/en/zod.json';

const resources = {
  en: {
    common: commonEn,
    task: taskEn,
    zod: zodEn,
    errors: errorsEn,
    auth: authEn,
  },
};

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- required by library
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: (typeof resources)['en'];
  }
}

use(initReactI18next)
  .init({
    lng: 'en',
    debug: false,
    resources,
  })
  .then(() => {
    setErrorMap(makeZodI18nMap({ ns: ['zod'] }));
  });
