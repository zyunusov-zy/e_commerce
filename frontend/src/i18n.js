import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // load translations using http (default public/locales)
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: "en",
    debug: true, // Set to true temporarily to see loading errors

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Backend options
    backend: {
      loadPath: "/src/transaltions/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
