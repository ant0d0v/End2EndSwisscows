import BaseComponent from "../base/BaseComponent.js";


export default class BadgeCounter extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.badgeCounter = this.page.locator(".search-counter .badge");
    this.popupCharityBadgeCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
    this.image = this.page.locator(".search-counter .popup img");
  }
  //Actions

  // Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.popupCharityBadgeCounter,
      this.image,
      testInfo
    );
  };

  expectCharityBadgeCounterToHaveValue = async (value) => {
    await this.expectAttributeToHaveValue(this.badgeCounter, "title", value);
  };
}
