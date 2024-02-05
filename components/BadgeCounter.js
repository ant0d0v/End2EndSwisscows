import BaseComponent from "../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class BadgeCounter extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.charityBadgeCounter = this.page.locator("div.badge span");
    this.badgeCounter = this.page.locator("//div[@class= 'badge']");
    this.popupCharityBadgeCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
  }
  //Actions

  clickBadgeCounter = async () => {
    await this.clickElement(
      this.badgeCounter,
      `charity search counter  in the header`
    );
  };

  // Verify

  expectPopupCharityBadgeCounterToHaveText = async (value) => {
    await this.expectAttributeToHaveValue(this.badgeCounter, "title", value);
  };
  expectPopupCharityBadgeCounterToHaveText = async (text) => {
    await this.expectElementToHaveText(this.popupCharityBadgeCounter, text);
  };
}
