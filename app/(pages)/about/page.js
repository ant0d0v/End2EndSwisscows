import BasePage from "../../../base/BasePage";
import Header from "../../(pages)/Header";
const { expect } = require("@playwright/test");

export default class AboutPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
     //Locators
    this.allContent = this.page.locator("main.about");
    this.allLinks = (name) => this.page.getByRole("link", { name: name, exact: true });
  }
  //Actions
  async open(){
    await this.openPage("/search-engine-no-tracking")
  }
  async clickAllLinks(id) {
    await this.clickElement(this.allLinks(id),`${id} link`);
  }

  // Verify
  expectScreenAboutPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };
}