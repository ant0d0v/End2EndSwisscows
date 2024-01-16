import BasePage from "../../base/BasePage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect } = require("@playwright/test");

export default class WhoWeArePage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);
     //Locators
    this.allContent = this.page.locator("main.about");
    this.allLinks = (name) => this.page.getByRole("link", { name: name, exact: true });
  }
  //Actions
  async clickAllLinks(id) {
    await this.clickElement(this.allLinks(id),`${id} link`);
  }

  // Verify
  expectScreenWhoWeArePage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };
}