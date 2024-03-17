import BasePage from "../../../base/BasePage";
import Header from "../../(pages)/Header";
const { expect, test } = require("@playwright/test");

export default class ImprintPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);

    //Locators
    this.allContent = this.page.locator("main.imprint");
  }
  //Actions
  async open(){
    await this.openPage("/imprint")
  }
  
  //Verify
  expectScreenImprintPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };
}