import BaseComponent from "../base/BaseComponent.js";
export default class Favicon extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.image = this.page.locator(".favicon");
  }
  //Actions

  //Verify
  async expectFaviconToBeVisible() {
    await this.expectElementToBeVisible(this.image);
  }

  async expectAllFaviconsToBeVisible() {
    for (const icon of await this.image.all()) {
      await icon.scrollIntoViewIfNeeded();
      await this.expectElementToBeVisible(icon);
    }
  }
}