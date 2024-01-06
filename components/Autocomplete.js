import BasePage from "../base/BasePage";
import WebPage from "../pages/search/WebPage"
export default class Autocomplete extends BasePage {
  constructor(page) {
    super(page);
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.placeholderMainPage = this.page.getByPlaceholder(
      "Your search. Your business."
    );
  }
  //Actions
  waitToBeVisibleSuggest = async () => {
    await this.waitElementToBeVisible(this.suggest, `suggest`);
  };
  clickEnterSearchField = async () => {
    await this.clickEnter(this.placeholderMainPage, `search field`);
    return new WebPage(this.page);
  };
  clickSearchField = async () => {
    await this.clickElement(this.placeholderMainPage, `search field `);
  };
  inputSearchCriteria = async (text) => {
    await this.input(this.placeholderMainPage, text, `search field`);
  };

  // Verify

  expectSuggestToHaveCount = async (number) => {
    this.expectListSize(this.suggestionItems, number);
  };

  expectSuggestToContains = async (criteria) => {
    this.expectTextsToContains(this.suggestionItems, criteria);
  };

  expectSuggestIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.suggest);
  };
}
