import BaseComponent from "../../../base/BaseComponent.js";
export default class Skeleton extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.loader = this.page.locator(".shopping-results .skeleton");
  }
  expectLoaderToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.loader);
  };
  expectLoaderToBeHidden = async () => {
    await this.expectAreElementsInListDisplayed(this.loader);
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
