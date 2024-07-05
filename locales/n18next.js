import { expect } from "@playwright/test";
const i18next = require("i18next");

i18next.init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: require("./en/translation.json"),
    },
    de: {
      translation: require("./de/translation.json"),
    },
    es: {
      translation: require("./es/translation.json"),
    },
    fr: {
      translation: require("./fr/translation.json"),
    },
    hu: {
      translation: require("./hu/translation.json"),
    },
    it: {
      translation: require("./it/translation.json"),
    },
    lv: {
      translation: require("./lv/translation.json"),
    },
    nl: {
      translation: require("./nl/translation.json"),
    },
    pt: {
      translation: require("./pt/translation.json"),
    },
    ru: {
      translation: require("./ru/translation.json"),
    },
    uk: {
      translation: require("./uk/translation.json"),
    },
  },
});

async function validateText(page, translationKey, languageCode) {
  const expectedText = i18next.t(translationKey, { lng: languageCode });
  const locator = expectedText.slice(0, 60);
  const elementText = await page.getByText(locator).first();
  const elementByRoleHeader = await page.getByRole("heading", {
    name: locator,
    exact: true,
  });
  await expect(elementByRoleHeader.or(elementText)).toHaveText(expectedText);
}
(module.exports = validateText), i18next;
