import BasePage from "../../base/BasePage";
import HeaderStaticPages from "../../components/HeaderStaticPages";
export default class EmailPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);
     //Locators
    this.allContent = this.page.locator("main.swisscows-email");
    this.introductionAndSupportLinks = (name) => this.page.getByRole("link", { name: name });
    this.subscriptionLinks = (id, name) => this.page.getByRole('link', { name: name }).nth(id);
    this.introductionAndSupportButtons = this.page.locator("//a[@class='button']")
  }
  //Actions
  async clickIntroductionAndSupportLinksAndNavigateToNewPage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage( this.introductionAndSupportLinks(id),`${id}`);
    return newPage;
  }
  async clickSubscriptionLinksAndNavigateToNewPage(id, nameButton) {
    const newPage = await this.clickElementAndNavigateToNewPage( this.subscriptionLinks (id,nameButton),` ${id} ${nameButton}`);
    return newPage;
  }

  //Verify
  expectScreenEmailPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };
}
