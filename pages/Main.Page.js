const { expect } = require("@playwright/test");
import HeaderStaticPages from "../components/HeaderStaticPages";
import InstallSwisscowsLink from "../components/(home)/ExtensionPopup";
import extensionBlock from "../components/(home)/Extension";
import BasePage from "../base/BasePage";

export default class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);
    this.installSwisscowsLink = new InstallSwisscowsLink(page);
    this.extensionBlock = new extensionBlock(page);
    // Locators
    this.logoSwisscows = this.page.getByRole("img", { name: "Swisscows", exact: true, });
    this.blockQuestionsAndAnswers = this.page.getByText( "Questions and AnswersWhat");
    this.allContent = this.page.locator("main.home");
    this.allQuestions = this.page.locator("h3.question");
    this.allAttributeOfQuestions = this.page.locator("div.faq-wrap div");
    this.fourQuestion = this.page.getByRole("heading", { name: "How can I switch from another",});
    this.linkInTheFourQuestion = this.page.getByRole("link", { name: "instructions",});
    this.answersToQuestions = this.page.locator("p.answer");
    this.widgetMainPage = this.page.locator("//div[@class ='bnnr-widget']");
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.buttonOfServiceBlock = this.page.locator("div.services-block-link");
    this.linksOfServiceBlock = (name) => this.page.getByRole("link", { name: name });
  }

  //Actions

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
    return this;
  };

  async clickLinkInServiceBlockAndNavigateToNewPage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage( this.linksOfServiceBlock(id),`${id}`);
    return newPage;
  }

  clickLinkInTheFourQuestionAndNavigateToDefaultSearchPage = async () => {
    const defaultSearchPage = await this.clickElementAndNavigateToNewPage( this.linkInTheFourQuestion,
      "link in the four question"
    );
    return defaultSearchPage;
  };
  scrollDownToQuestions = async () => {
    await this.scrollByVisibleElement(this.fourQuestion, `four question in accordion menu`);
  }

  clickFourQuestion = async () => {
    await this.clickElement( this.fourQuestion,
      `four question in accordion menu`
    );
    return this;
  };


  // Verify
  expectQuestionsAreOpened = async () => {
    await this.expectAttributeClassAllElements( this.allAttributeOfQuestions, "faq open");
  };
  expectQuestionsAreClosed = async () => {
    await this.expectAttributeClassAllElements( this.allAttributeOfQuestions, "faq" );
  };

  expectScreenMainPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(this.widgetMainPage,testInfo);
  };

  expectListSizeAnswerToQuestions = async (number) => {
    await this.expectListToHaveCount(this.answersToQuestions, number);
  };
}
