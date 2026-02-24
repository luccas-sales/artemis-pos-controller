import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import ptTranslation from './locales/pt.json';

const defaultLanguage =
  navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2);

const resources = {
  en: {
    translation: enTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { wait: true },
});

export default i18n;
