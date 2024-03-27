import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class TextAds extends BaseComponent {
  constructor(page) {
    super(page)
    //Locators
    this.textAds = this.page.getByText('Ads by Microsoft Data privacy').first()
    this.listAds = this.page.locator("a.ad")
  }
  //Actions
  waitUntilAdsToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.textAds);
  };
  //Verify
  expectAdsToHaveText = async (value) => {
    await this.expectElementToHaveText(this.textAds, value);
  };
  expectListAdsToHaveText = async (value) => {
    await this.expectTextsToContains(this.textAds, value);
  };
}
