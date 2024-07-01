import BasePage from "../../../base/BasePage.js";
import Header from "../../(pages)/Header.js";
export default class DefaultSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
     //Locators
    this.allContent = this.page.locator("main.default-search");
    this.allImages = this.page.locator("main.default-search img:visible")
    this.allLinks = (id, name) => this.page.locator(`#${id}`).getByRole('link', { name: name })
    this.animationImage = this.page.locator('#default-search-opera img').nth(1)
  }
  //Actions
  async open(){
    await this.openPage("/default-search")
  }

  async clickAllLinksAndNavigateToNewPage(id, name) {
    const newPage = await this.clickElementAndNavigateToNewPage( this.allLinks(id, name),`${id}`);
    return newPage;
  }

  // Verify
  expectDefaultSearchPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(testInfo, this.allImages, this.animationImage);
  };
}
