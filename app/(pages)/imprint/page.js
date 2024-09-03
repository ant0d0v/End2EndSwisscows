import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
export default class ImprintPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);

    //Locators
    this.allContent = this.page.locator("main.imprint");
    this.allImages = this.page.locator("main.imprint img:visible");
    this.companyInfoImage = this.page.locator(".company-info img");
  }
  //Actions
  async open() {
    await this.openPage("/imprint");
  }

  //Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
  expectCompanyInfoImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.companyInfoImage);
  };
}