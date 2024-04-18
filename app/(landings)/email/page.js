import BasePage from "../../../base/BasePage";
import {expect} from "../../../utils/customMatchers"
import Header from "../../(landings)/email/Header";
export default class EmailPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
     //Locators
    this.allContent = this.page.locator("main.swisscows-email");
    this.allImages = this.page.locator("main.swisscows-email img:visible")
    this.introductionAndSupportLinks = (name) => this.page.getByRole("link", { name: name });
    this.subscriptionLinks = (id, name) => this.page.getByRole('link', { name: name }).nth(id);
    this.introductionAndSupportButtons = this.page.locator("//a[@class='button']")
  }
  //Actions
  async open(){
    await this.openPage("/swisscows-email")
  }

  //Verify
  expectScreenEmailPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
