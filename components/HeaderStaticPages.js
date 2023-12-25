import { BasePage } from "../base/BasePage";
const { expect } = require("@playwright/test");
import { WebPage } from "../pages/search/WebPage";
import { HamburgerMenu } from "../components/HamburgerMenu";
export class HeaderStaticPages extends BasePage {
  constructor(page) {
    super(page);
    this.hamburgerMenu = new HamburgerMenu(page);

    //Locators
    this.linksOfHeader = (name) => this.page.locator(`a.badge-${name}`);
    this.hamburgerMenu = this.page.locator("header button.hamburger-menu");
    this.charitySearchCounter = this.page.locator("div.badge span");
    this.badgeEmail = this.page.locator("div.badges a.badge-email");
    this.searchCounter = this.page.locator("//div[@class= 'badge']");
    this.popupCharitySearchCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
    this.suggestionItems = this.page.locator("ul.suggestions li");
    this.suggest = this.page.locator("ul.suggestions");
    this.placeholderMainPage = this.page.getByPlaceholder(
      "Your search. Your business."
    );
  }

  //Actions

  clickHamburgerMenuButton = async () => {
    await this.clickElement(
      this.hamburgerMenu,
      `hamburger menu in the header static pages`
    );
  };
  clickSearchCounter = async () => {
    await this.clickElement(
      this.searchCounter,
      `charity search counter  in the header`
    );
  };
 
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
  clickBadgeEmailAndNavigateToNewPage = async () => {
    const loginPage = await this.clickElementAndNavigateToNewPage(
      this.badgeEmail,
      "badge Email"
    );
    return loginPage;
  };
  clickLinkInHeaderAndNavigateToNewPage = async (id) => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.linksOfHeader(id),
      "link of header"
    );
    return newPage;
  };

  // Verify

  expectCharitySearchCounterToHave = async (value) => {
    await this.expectAttributeToHaveValue(this.searchCounter, "title", value);
  };
  expectPopupCharitySearchCounterToHaveText = async (text) => {
    await this.expectTextOfElement(this.popupCharitySearchCounter, text);
  };

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
