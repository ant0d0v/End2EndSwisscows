import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
export default class AboutPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = "/search-engine-no-tracking"
    this.header = new Header(page);
    
    //Locators
    this.allContent = this.page.locator("main.about");
    this.allImages = this.page.locator("main.about img:visible");
    this.links = (name) => this.page.getByText(name, { exact: true });
  }
  //Actions
  
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

  // Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
