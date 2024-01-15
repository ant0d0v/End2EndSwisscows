import BasePage from "../../base/BasePage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");

export default class ImprintPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.allContent = this.page.locator("main.imprint");
  }
  
  //Verify
  expectScreenImprintPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };
}