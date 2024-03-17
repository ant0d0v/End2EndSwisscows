import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class TextAds extends BaseComponent {
  constructor(page) {
    super(page)
    
    //Locators
    this.textAds = this.page.locator('span.ad ').first()
    this.listAds = this.page.locator("span.ad")
  }
}
