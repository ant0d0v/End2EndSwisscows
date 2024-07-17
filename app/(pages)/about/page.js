import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
export default class AboutPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    //Locators
    this.allContent = this.page.locator("main.about");
    this.allImages = this.page.locator("main.about img:visible");
    this.allLinks = (name) => this.page.getByText(name, { exact: true });
  }
  //Actions
  async open() {
    await this.openPage("/search-engine-no-tracking");
  }
  async clickAllLinks(id) {
    await this.clickElement(this.allLinks(id), `${id} link`);
  }

  // Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
