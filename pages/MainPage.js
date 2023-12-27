const { expect } = require("@playwright/test");
import { DefaultSearchPage } from "./static-pages/DefaultSearchPage";
import { BasePage } from "../base/BasePage";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    // Locators
    this.logoSwisscows = this.page.getByRole("img", { name: "Swisscows", exact: true,});
    this.blockQuestionsAndAnswers = this.page.getByText( "Questions and AnswersWhat");
    this.allQuestions = this.page.locator("h3.question");
    this.allAttributeOfQuestions = this.page.locator("div.faq-wrap div");
    this.fourQuestion = this.page.getByRole("heading", {name: "How can I switch from another",});
    this.linkInTheFourQuestion = this.page.getByRole("link", { name: "instructions",});
    this.popupInstallSwisscowsLink = this.page.getByRole("link", { name: "Stay with us and set",});
    this.installSwisscowsBlock = this.page.getByRole("link", { name: "Install Swisscows The" });
    this.answersToQuestions = this.page.locator("p.answer");
    this.closeButtonOfPopupInstallSwisscowsLink = this.page.locator("div").filter({ hasText: "Install Swisscows" }).getByRole("button");
    this.widgetMainPage = this.page.locator("//div[@class ='bnnr-widget']");
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.imagesOfServiceBlock = this.page.locator("div.services-blocks img");
    this.buttonOfServiceBlock = this.page.locator("a.services-block-link");
    this.linksOfServiceBlock = (name) => this.page.getByRole("link", { name: name });
  }

  //Actions

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
    return this;
  };

  async clickLinkInServiceBlockAndNavigateToNewPage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.linksOfServiceBlock(id) , `${id}`
    );
    return newPage;
  }
  clickLogoSwisscows = async () => {
    await this.clickElement(this.logoSwisscows,`logo swisscows on the main page`);
    return this;
  };

  clickInstallSwisscowsBlockAndNavigateToWebStore = async () => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.installSwisscowsBlock , "Install Swisscows Block"
    );
    return newPage;
  };
  clickPopupInstallSwisscowsBlockAndNavigateToWebStore = async () => {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.popupInstallSwisscowsLink , "popup Install Swisscows link"
    );
    return newPage;
  };
  clickLinkInTheFourQuestionAndNavigateToDefaultSearchPage = async () => {
    const defaultSearchPage = await this.clickElementAndNavigateToNewPage(
      this.linkInTheFourQuestion , "link in the four question"
    );
    return defaultSearchPage;
  };
  
  clickFourQuestion = async () => {
    await this.clickElement(
      this.fourQuestion, `four question in accordion menu`
    );
    return this;
  };

  clickCloseButtonOfPopupInstallSwisscowsLink = async () => {
    await this.clickElement(
      this.closeButtonOfPopupInstallSwisscowsLink,
      `close button of popup install swisscows link`
    );
    return this;
  };

  // Verify
  expectQuestionsAreOpened = async () => {
    await this.expectAttributeClassAllElements(
      this.allAttributeOfQuestions, "faq open");
  };
  expectQuestionsAreClosed = async () => {
    await this.expectAttributeClassAllElements(
      this.allAttributeOfQuestions, "faq" );
  };

  expectPopupInstallSwisscowsLinkIsDisplayed = async () => {
    await this.expectIsElementDisplayed(this.popupInstallSwisscowsLink);
  };

  expectScreenMainPage = async () => {
    await this.expectScreenOfPage(
      this.widgetMainPage,
    );
  };

  expectTextOfPopupInstallSwisscowsLink = async (text) => {
    this.expectTextOfElement(this.popupInstallSwisscowsLink, text);
  };

  expectImagesOfSrviceBlockAreDisplayed = async () => {
    await this.expectAreElementsInListDisplayed(this.imagesOfServiceBlock);
  };
  expecListSizeAnswerToQuestions = async (number) => {
    await this.expectArraySize(this.answersToQuestions, number);
  };
}
