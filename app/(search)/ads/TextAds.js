import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class TextAds extends BaseComponent {
  constructor(page) {
    super(page)
    
    //Locators
    this.textAds = this.page.getByText('Ads by Microsoft Data privacy').first()
    this.listAds = this.page.locator("article.text-item span.ad")
  }
}
