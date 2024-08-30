import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// config
import { defaultLang } from "../config";
//
import EnglishLocales from "./English/Dictionary";
import DariLocales from "./Dari/Dictionary";
import PashtoLocales from "./Pashto/Dictionary";

// ----------------------------------------------------------------------

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: EnglishLocales },
      fa: { translations: DariLocales },
      ps: { translations: PashtoLocales },
    },
    lng: localStorage.getItem("i18nextLng") || defaultLang.value,
    fallbackLng: defaultLang.value,
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
