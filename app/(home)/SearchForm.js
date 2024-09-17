import BaseComponent from "../../base/BaseComponent.js";
import Translations from "../../locales/n18next.js";
export default class SearchForm extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;

    //Locators
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.inputSearch = this.page.getByRole("searchbox");
    this.search = this.page.locator(".searchbar input");
    this.placeholderHome = this.page.getByPlaceholder(
      "Your search. Your business."
    );
  }
  //Actions
  waitToBeVisibleSuggest = async () => {
    await this.waitElementToBeVisible(this.suggest, `suggest`);
  };
  clickEnterSearchField = async () => {
    await this.clickEnter(this.placeholderHome, `search field`);
  };
  clickSearchField = async () => {
    await this.clickElement(this.inputSearch, `search field `);
  };
  inputSearchCriteria = async (text) => {
    await this.input(this.placeholderHome, text, `search field`);
  };

  // Verify

  expectSuggestToHaveCount = async (number) => {
    this.expectListToHaveCount(this.suggestionItems, number);
  };

  expectSuggestToContains = async (criteria) => {
    this.expectTextsToContains(this.suggestionItems, criteria);
  };

  expectSuggestIsDisplayed = async () => {
    await this.expectElementToBeVisible(this.suggest);
  };

  //Locale
  async expectTranslationsForPlaceholder( expected = {
    translationKey_1: value,
      locale: value,
    }) {
    const expectedTextPlaceholder = this.translations.t(expected.translationKey_1, {
      lng: expected.locale
    });
    await this.expectAttributeToHaveValue(this.search, "placeholder", expectedTextPlaceholder);
  }

}
