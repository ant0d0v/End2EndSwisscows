import BaseComponent from "../../../base/BaseComponent.js";
import SelectMenu from "../../../components/Select.js";
import Translations from "../../../locales/n18next.js";
export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.selectMenu = new SelectMenu(page);

    //Locators
    this.filters = this.page.locator(".filter-bar button");
    this.filterBy = (name) =>
      this.page.locator("button").filter({ hasText: name });
    this.filterAllPublisher = this.page.locator(".filter-bar button").first();
  }

  //Actions
  clickFilterBy = async (name) => {
    await this.clickElement(
      this.filterBy(name),
      `filter by ${name} in dropdown`
    );
  };

  clickFilterByDate = async () => {
    await this.clickElement(
      this.filters.nth(1),
      `filter by Date in dropdown`
    );
  };

  clickOnPage = async () => {
    await this.clickElement(this.page.locator("html"), `click on page`);
  };

  //Verify
  expectFilterAllPublisherIs = async (value) => {
    await this.expectAttributeToHaveValue(
      this.filterAllPublisher,
      "data-state",
      value
    );
  };

  //Locales
  async expectTranslationsForFilter(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      locale: value,
    }
  ) {
    const expectedText_1 = this.translations.t(expected.translationKey_1, {
      lng: expected.locale,
    });
    const expectedText_2 = this.translations.t(expected.translationKey_2, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.filters, [
      expectedText_1,
      expectedText_2,
    ]);
  }
}
