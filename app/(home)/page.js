import Header from "./Header.js";
import Footer from "../Footer.js";
import extensionBlock from "./Extension.js";
import FAQ from "../../components/FAQ.js";
import Banner from "./Banner.js";
import BasePage from "../../base/BasePage.js";
import Benefits from "./Benefits.js";

export default class Home extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.extensionBlock = new extensionBlock(page);
    this.banner = new Banner(page);
    this.benefits = new Benefits(page);
    this.faq = new FAQ(page);

    // Locators
    this.blockQuestionsAndAnswers = this.page.getByText(
      "Questions and AnswersWhat"
    );
    this.images = this.page.locator("main.home img:visible");

    this.links = (name) => this.page.getByRole("link", { name: name });
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
      this.images,
      this.banner.widget
    );
  };
}
