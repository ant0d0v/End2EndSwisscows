import BaseComponent from "../../base/BaseComponent.js";
export default class Error extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.contentErrorNoResults = this.page.locator('div').filter({ hasText: 'No results found for' }).nth(1)
    this.contentErrorPage = this.page.locator("div.error div.content")
    this.errorImage = this.page.getByRole('main').locator('img').first()
    this.errorImageNoResult = this.page.getByRole('main').getByRole('img').first()
    this.root = this.page.getByRole("main")
  }
  
  //Verify
  expectContentToHaveText = async ( expectedText) => {
    await this.expectElementToHaveText(this.contentErrorPage, expectedText)
  }
  expectImageToHaveWight = async (value) => {
    await this.expectElementToHaveJSProperty(this.errorImage , "width", value);
  };
  expectNotResultErrorToHaveText = async ( expectedText) => {
    await this.expectElementToHaveText(this.contentErrorNoResults, expectedText)
  }
  expectErrorImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.errorImage)
  }
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.errorImage,
      testInfo
    );
  };

}
