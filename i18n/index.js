import i18next from "i18next";
import enTranslation from "../locales/en/translation.json";
import deTranslation from "../locales/de/translation.json";
import esTranslation from "../locales/es/translation.json";
import frTranslation from "../locales/fr/translation.json";
import huTranslation from "../locales/hu/translation.json";
import itTranslation from "../locales/it/translation.json";
import lvTranslation from "../locales/lv/translation.json";
import nlTranslation from "../locales/nl/translation.json";
import ptTranslation from "../locales/pt/translation.json";
import ruTranslation from "../locales/ru/translation.json";
import ukTranslation from "../locales/uk/translation.json";

i18next.init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: enTranslation,
    },
    de: {
      translation: deTranslation,
    },
    es: {
      translation: esTranslation,
    },
    fr: {
      translation: frTranslation,
    },
    hu: {
      translation: huTranslation,
    },
    it: {
      translation: itTranslation,
    },
    lv: {
      translation: lvTranslation,
    },
    nl: {
      translation: nlTranslation,
    },
    pt: {
      translation: ptTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
    uk: {
      translation: ukTranslation,
    },
  },
});

export default i18next;
