import englishTranslations from "@/locales/en.json"
import frenchTranslations from "@/locales/fr.json"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const internationalisation = i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: englishTranslations,
    },
    fr: {
      translation: frenchTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  }
});

const n = i18n.t;
export {internationalisation, n}