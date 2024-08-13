import BaseComponent from "../../../base/BaseComponent.js";
export default class Skeleton extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.loader = this.page.locator(".web-results .skeleton");
  }
  expectLoaderToBeVisible = async () => {
    await this.expectElementToBeVisible(this.loader);
  };
  expectLoaderToBeHidden = async () => {
    await this.expectElementToBeHidden(this.loader);
  };
  // Verify

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.loader.first(),
      this.loader,
      testInfo
    );
  };
}
