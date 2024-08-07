import Header from "./Header.js";
import Footer from "../Footer.js";
import InstallSwisscowsLink from "./ExtensionPopup.js";
import extensionBlock from "./Extension.js";
import FAQ from "../../components/FAQ.js";
import BasePage from "../../base/BasePage.js";


export default class Home extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.installSwisscowsLink = new InstallSwisscowsLink(page);
    this.extensionBlock = new extensionBlock(page);
    this.faq = new FAQ(page);
    //Locators of Locales
  
    // Locators
    this.blockQuestionsAndAnswers = this.page.getByText( "Questions and AnswersWhat");
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
  };

  scrollDownToQuestions = async () => {
    await this.scrollByVisibleElement(this.fourQuestion, `four question in accordion menu`);
  }

  clickFourQuestion = async () => {
    await this.clickElement( this.fourQuestion,
      `four question in accordion menu`
    );
  };

  // Verify
  
  expectScreenHome = async (testInfo) => {
    await this.expectPageToHaveScreenshot(testInfo, this.allImages, this.widget);
  };
}
