import BaseComponent from "../../../base/BaseComponent.js";
import SelectMenu from "../../../components/Select.js";
import Translations from "../../../i18n/index.js";

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    this.selectMenu = new SelectMenu(page);

    //Locators
    this.filterByDate = this.page.locator(".filter-bar button");
  }

  //Actions
  clickFilterByDate = async () => {
    await this.clickElement(this.filterByDate, `filter by date in dropdown`);
  };

  //Verify
  expectFilterByDateIs = async (value) => {
    await this.expectAttributeToHaveValue(
      this.filterByDate,
      "data-state",
      value
    );
  };

  //Locales
  async expectTranslationsForFilter(
    expected = {
      translationKey: value,
      locale: value,
    }
  ) {
    const expectedText = this.translations.t(expected.translationKey, {
      lng: expected.locale,
    });
    await this.expectElementToHaveText(this.filterByDate, expectedText);
  }
}
