import BaseComponent from "../base/BaseComponent.js";


export default class BadgeCounter extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.badgeCounter = this.page.locator(".search-counter .badge");
    this.charityBadgeCounter = this.page.locator("div.badge span");
    this.popupCharityBadgeCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
  }
  //Actions

  // Verify

  expectCharityBadgeCounterToHaveValue = async (value) => {
    await this.expectAttributeToHaveValue(this.badgeCounter, "title", value);
  };
  expectPopupCharityBadgeCounterToHaveText = async (text) => {
    await this.expectElementToHaveText(this.popupCharityBadgeCounter, text);
  };
}
