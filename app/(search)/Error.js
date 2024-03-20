import BaseComponent from "../../base/BaseComponent";
export default class Error extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.contentErrorNoResults = this.page.locator('div').filter({ hasText: 'No results found for' }).nth(1)
    this.contentErrorPage = this.page.locator("div.error div.content")
    this.errorImage = this.page.getByRole('img', { name: 'Error Image' })
    this.errorImageNoResult = this.page.getByRole('main').getByRole('img').first()
  }
  // Actions
  open = (endpoint) => {
    this.openPage(endpoint)
  }
  handleByMockingStatusCodeResponse = async (endpoint,code) => {
    await this.page.route(process.env.API_URL + `/v4${endpoint}/*`, async route => {
      await route.fulfill({
        status: code,
      });
    });
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
}
