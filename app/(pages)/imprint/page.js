import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
import Translations from "../../../i18n/index.js";
export default class ImprintPage extends BasePage {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.header = new Header(page);

    //Locators
    this.root = this.page.locator(".imprint");
    this.title = this.root.locator("h1");
    this.images = this.root.locator("img:visible");
    this.companyInfoImage = this.root.locator(".company-info img");
    this.locationInfo = this.root.locator(".location");
    this.publishingInfo = this.root.locator(".publishing-info p");
  }
  //Actions
  async open() {
    await this.openPage("/imprint");
  }

  //Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.images);
  };
  expectCompanyInfoImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.companyInfoImage);
  };

  //Locales
  async expectTranslationsForPublishingInfo(
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
    const expectedTitle = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedDescription_1 = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedDescription_2 = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedDescription_3 = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedDescription_4 = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedDescription_5 = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.publishingInfo, [
      expectedTitle,
      expectedDescription_1,
      expectedDescription_2,
      expectedDescription_3,
      expectedDescription_4,
      expectedDescription_5,
    ]);
  }
  async expectTranslationsForLocation(
    expected = { translationKey: value, locale: value }
  ) {
    const expectedLocation = this.translations.t(expected.translationKey, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.locationInfo, expectedLocation);
  }
  async expectTranslationsForTitle(
    expected = { translationKey: value, locale: value }
  ) {
    const expectedTitle = this.translations.t(expected.translationKey, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.title, expectedTitle);
  }
}
