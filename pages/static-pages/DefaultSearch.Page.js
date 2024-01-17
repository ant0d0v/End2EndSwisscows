import BasePage from "../../base/BasePage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
export default class DefaultSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);
     //Locators
    this.allContent = this.page.locator("main.default-search");
    this.allLinks = (id, name) => this.page.locator(`#${id}`).getByRole('link', { name: name })
    this.animationImage = this.page.locator('#default-search-opera img').nth(1)
  }
  //Actions
  async clickAllLinksAndNavigateToNewPage(id, name) {
    const newPage = await this.clickElementAndNavigateToNewPage( this.allLinks(id, name),`${id}`);
    return newPage;
  }

  // Verify
  expectDefaultSearchPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(this.animationImage,testInfo);
  };
}
