import BaseComponent from "../base/BaseComponent.js";
export default class SelectMenu extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.listByDate = this.page.getByRole("listbox");
    this.filterName = (name) => this.page.getByLabel(name);
  }
  //Actions
  selectFilterAndGetResponse = async (name) => {
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/v4/web/search?query*`
    );
    await this.clickElement(this.filterName(name), `filter in dropdown`);
    const response = await responsePromise;
    return response;
  };

  selectFilter = async (name) => {
    await this.clickElement(this.filterName(name), `filter in dropdown`);
  };

  //Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.listByDate,
      this.listByDate,
      testInfo
    );
  };
}
