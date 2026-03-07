import englishTranslations from "@/locales/en.json";
import frenchTranslations from "@/locales/fr.json";
import tsongaTranslations from "@/locales/ts.json";
import zuluTranslations from "@/locales/zu.json";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      fr: {
        translation: frenchTranslations,
      },
      ts: {
        translation: tsongaTranslations,
      },
      zu: {
        translation: zuluTranslations,
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
