import BasePage from "../../../base/BasePage.js";
import Header from "../../(landings)/email/Header.js";
export default class EmailPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = "/swisscows-email"
    this.header = new Header(page);
     //Locators
    this.allContent = this.page.locator("main.swisscows-email");
    this.allImages = this.page.locator("main.swisscows-email img:visible")
    this.introductionAndSupportLinks = (name) => this.page.getByRole("link", { name: name });
    this.subscriptionLinks = (id, name) => this.page.getByRole('link', { name: name }).nth(id);
    this.introductionAndSupportButtons = this.page.locator("//a[@class='button']")
  }

  //Verify
  expectScreenEmailPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
