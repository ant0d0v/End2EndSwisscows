import BaseComponent from "../../base/BaseComponent.js";
import translations from "../../i18n/index.js";

export default class Benefits extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = translations;

    // Locators
    this.root = this.page.locator(".benefits-blocks");
    this.title = this.root.locator(".benefits-content h2");
    this.description = this.root.locator(".benefits-content p");
  }

  //Locales
  async expectTranslationsForTitle(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      locale: value,
    }
  ) {
    const expectedTextBlockTitle_1 = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockTitle_2 = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockTitle_3 = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockTitle_4 = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockTitle_5 = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockTitle_6 = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.title, [
      expectedTextBlockTitle_1,
      expectedTextBlockTitle_2,
      expectedTextBlockTitle_3,
      expectedTextBlockTitle_4,
      expectedTextBlockTitle_5,
      expectedTextBlockTitle_6,
    ]);
  }

  async expectTranslationsForDescription(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      locale: value,
    }
  ) {
    const expectedTextBlockDescription_1 = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockDescription_2 = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockDescription_3 = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockDescription_4 = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockDescription_5 = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedTextBlockDescription_6 = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.description, [
      expectedTextBlockDescription_1,
      expectedTextBlockDescription_2,
      expectedTextBlockDescription_3,
      expectedTextBlockDescription_4,
      expectedTextBlockDescription_5,
      expectedTextBlockDescription_6,
    ]);
  }
}
