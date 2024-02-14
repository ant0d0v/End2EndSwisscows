import BaseComponent from "../base/BaseComponent";
import WebPage from "../app/(search)/Web.page";
export default class SearchForm extends BaseComponent {
  constructor(page) {
    super(page);
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.inputSearch = this.page.getByRole('searchbox')
    this.placeholderHome = this.page.getByPlaceholder( "Your search. Your business.");
  }
  //Actions
  waitToBeVisibleSuggest = async () => {
    await this.waitElementToBeVisible(this.suggest, `suggest`);
  };
  clickEnterSearchField = async () => {
    await this.clickEnter(this.placeholderHome, `search field`);
    return new WebPage(this.page);
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
}
