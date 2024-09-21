import BaseComponent from "../base/BaseComponent.js";
import Translations from "../locales/n18next.js";
export default class SelectMenu extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    //Locators
    this.listByDate = this.page.getByRole("listbox");
    this.listDate = this.page.getByRole("option");
    this.filterName = (name) => this.page.getByLabel(name);
  }
  //Actions
  selectFilterAndGetResponse = async (
    expected = { endpoint: part, locator: value }
  ) => {
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}${expected.endpoint}/search?query*`
    );
    await this.clickElement(
      this.filterName(expected.locator),
      `filter in dropdown`
    );
    const response = await responsePromise;
    return response;
  };

  selectFilter = async (name) => {
    await this.clickElement(this.filterName(name), `filter in dropdown`);
  };

  //Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.listByDate,
      this.listByDate,
      testInfo
    );
  };
  
  //Locales
  async expectTranslationsForFilterListByDate(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      locale: value,
    }
  ) {
    const expectedTextFilter_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedTextFilter_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    const expectedTextFilter_3 = this.translations.t(expected.translationKey_3, {
      lng: expected.locale,
    });
    const expectedTextFilter_4 = this.translations.t(expected.translationKey_4, {
      lng: expected.locale,
    });
    const expectedTextFilter_5 = this.translations.t(expected.translationKey_5, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.listDate, [
      expectedTextFilter_1,
      expectedTextFilter_2,
      expectedTextFilter_3,
      expectedTextFilter_4,
      expectedTextFilter_5,
    ]);
  }
}
