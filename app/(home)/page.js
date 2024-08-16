import Header from "./Header.js";
import Footer from "../Footer.js";
import ExtensionPopup from "./ExtensionPopup.js";
import extensionBlock from "./Extension.js";
import FAQ from "../../components/FAQ.js";
import Banner from "./Banner.js";
import BasePage from "../../base/BasePage.js";

export default class Home extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.extensionPopup = new ExtensionPopup(page);
    this.extensionBlock = new extensionBlock(page);
    this.banner = new Banner(page);
    this.faq = new FAQ(page);
    //Locators of Locales

    // Locators
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat"
    );
    this.allImages = this.page.locator("main.home img:visible");

    this.links = (name) =>
      this.page.getByRole("link", { name: name });
  }

  //Actions

  async open() {
    await this.openPage("/");
  }
  async expectToBeOpenedNewPageAfterClickLinks(
    data = {
      locator: element,
      expectedLink: string,
    }
  ) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.links(data.locator),
      data.expectedLink
    );
  }

  scrollDownToQuestions = async () => {
    await this.scrollByVisibleElement(
      this.faq.fourQuestion,
      `four question in accordion menu`
    );
  };

  // Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.allImages,
      this.banner.widget
    );
  };
}
