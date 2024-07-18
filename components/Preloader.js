import BaseComponent from "../base/BaseComponent.js";
export default class Preloader extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.preloader = this.page.locator(".activity-indicator");
  }
  expectPreloaderToBeVisible = async () => {
    await this.expectElementToBeVisible(this.preloader);
  };
  expectPreloaderToBeHidden = async () => {
    await this.expectElementToBeHidden(this.preloader);
  };
}
