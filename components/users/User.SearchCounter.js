import BaseComponent from "../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class SearchCounter extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.charitySearchCounter = this.page.locator("div.badge span");
    this.searchCounter = this.page.locator("//div[@class= 'badge']");
    this.popupCharitySearchCounter = this.page.getByText(
      "Charity ProjectThis is the"
    );
  }
  //Actions

  clickSearchCounter = async () => {
    await this.clickElement(
      this.searchCounter,
      `charity search counter  in the header`
    );
  };

  // Verify

  expectCharitySearchCounterToHave = async (value) => {
    await this.expectAttributeToHaveValue(this.searchCounter, "title", value);
  };
  expectPopupCharitySearchCounterToHaveText = async (text) => {
    await this.expectElementToHaveText(this.popupCharitySearchCounter, text);
  };
}
