import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class ProductAds extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.textProductsAds = this.page.getByText('Products for crocs price')
    this.allImage = this.page.locator("article.product-item img")
    this.firstProduct = this.page.locator("article.product-item img").nth(1)
    this.nextButton = this.page.locator("div.a11t--product button.next")
    this.prevButton = this.page.locator("div.a11t--product button.prev")

  }
  //Actions
  clickNextButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.nextButton);
  };
  clickPrevButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.prevButton);
  };
  clickFirstProductAndNavigateToNewPage = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstProduct);
  };
  //Verify 
  expectImageToHaveWightInProductAds = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
}
