const { expect } = require("@playwright/test");
import Header from "./Header";
import Footer from "../Footer";
import InstallSwisscowsLink from "./ExtensionPopup";
import extensionBlock from "./Extension";
import FAQ from "../../components/FAQ";
import BasePage from "../../base/BasePage";

export default class Home extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.installSwisscowsLink = new InstallSwisscowsLink(page);
    this.extensionBlock = new extensionBlock(page);
    this.faq =  new FAQ(page);

    // Locators
    this.logoSwisscows = this.page.getByRole("img", { name: "Swisscows", exact: true, });
    this.blockQuestionsAndAnswers = this.page.getByText( "Questions and AnswersWhat");
    this.allContent = this.page.locator("main.home");
    this.allImages = this.page.locator("main.home img:visible")
    this.allQuestions = this.page.locator("h3.question");
    this.fourQuestion = this.page.getByRole("heading", { name: "How can I switch from another",});
    this.linkInTheFourQuestion = this.page.getByRole("link", { name: "instructions",});
    this.widget = this.page.locator(".bnnr-widget");
    this.serviceBlock = this.page.locator("div.services-blocks");
    this.buttonOfServiceBlock = this.page.locator(".services-blocks .services-block-link");
    this.linksOfServiceBlock = (name) => this.page.getByRole("link", { name: name });
  }

  //Actions
  async open(){
    await this.openPage("/")
  }

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
    return this;
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
  expectSwisscowsLogoToBeVisible = async () => {
    await this.expectElementToBeVisible(this.logoSwisscows);
  };
  
  expectScreenHome = async (testInfo) => {
    await this.expectPageToHaveScreenshot(testInfo, this.allImages, this.widget);
  };
}
