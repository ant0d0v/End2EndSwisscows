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
async function validateTextHamburgerComponent(page, translationKey, languageCode) {
  const expectedText = i18next.t(translationKey, { lng: languageCode });
  const locator = expectedText.slice(0, 60);
  const elementRoleButton = await page.getByRole("button", { name: locator});
  const elementByRoleBanner = await page.getByRole('banner').locator('li').filter({ hasText: locator , exact: true })
  await expect(elementRoleButton.or(elementByRoleBanner)).toHaveText(expectedText);
}
async function validateTextFooterComponent(page, translationKey, languageCode) {
  const expectedText = i18next.t(translationKey, { lng: languageCode });
  const locator = expectedText.slice(0, 60);
  const element = await page.getByRole("link", { name: locator, exact: true });
  const elementText = await page.getByText(locator, { exact: true });
  await expect(element.or(elementText)).toHaveText(expectedText);
}
async function validateTextHeaderComponent(page, translationKey, languageCode) {
  const expectedText = i18next.t(translationKey, { lng: languageCode });
  const locator = expectedText.slice(0, 60);
  const element = await page.getByRole("link", { name: locator });
  const elementButton = await page.getByRole("button", { name: locator });
  await expect(element.or(elementButton)).toHaveText(expectedText);
}

module.exports = {
  validateText,
  validateTextHamburgerComponent,
  validateTextFooterComponent,
  validateTextHeaderComponent,
};
