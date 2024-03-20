import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class ProductAds extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.textProductsAds = this.page.getByText('Products for parfum')
    this.allImage = this.page.locator("article.item-a8r-product img")
    this.firstProduct = this.page.locator("article.item-a8r-product img").nth(1)
    this.nextButton = this.page.locator(".a8r-product-collection button.next")
    this.prevButton = this.page.locator(".a8r-product-collection button.prev")

  }
  //Actions
  clickCarouselNextButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.nextButton);
  };
  clickCarouselPrevButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.prevButton);
  };
  clickFirstProductAndNavigateToNewPage = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstProduct);
  };
  waitUntilProductAdsToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.textProductsAds);
  };

  //Verify 
  expectCarouselImageToHaveWightInProductAds = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
  expectTitleAdsToHaveText = async (value) => {
    await this.expectElementToHaveText(this.textProductsAds, value);
  };
  expectCarouselNextButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.nextButton, "class", /next swiper-button-disabled/);
  };
  expectCarouselPrevButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.prevButton, "class", /prev swiper-button-disabled/);
  };
}
