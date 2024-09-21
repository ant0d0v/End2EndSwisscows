import i18next from "i18next";
import enTranslation from "./en/translation.json";
import deTranslation from "./de/translation.json";
import esTranslation from "./es/translation.json";
import frTranslation from "./fr/translation.json";
import huTranslation from "./hu/translation.json";
import itTranslation from "./it/translation.json";
import lvTranslation from "./lv/translation.json";
import nlTranslation from "./nl/translation.json";
import ptTranslation from "./pt/translation.json";
import ruTranslation from "./ru/translation.json";
import ukTranslation from "./uk/translation.json";

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
