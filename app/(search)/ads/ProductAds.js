import BaseComponent from "../../../base/BaseComponent.js";

export default class ProductAds extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.textProductsAds = this.page.getByText(/Products for/)
    this.allImage = this.page.locator("article.item-a8r-product img")
    this.allTitle = this.page.locator("article.item-a8r-product h2")
    this.firstProduct = this.page.locator("article.item-a8r-product img").nth(1)
    this.allMediaProducts = this.page.locator("article.item-a8r-product figure")
    this.nextButton = this.page.locator(".a8r-product-collection button.next")
    this.prevButton = this.page.locator(".a8r-product-collection button.prev")
  }
  //Actions
  clickCarouselNextButtonUntilToBeInvisible = async () => {
    await this.clickElementUntilInvisible(this.nextButton);
  };
  clickCarouselPrevButtonUntilToBeInvisible = async () => {
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
  expectTitleProductsToContains = async (value) => {
    await this.expectTextsToContains(this.allTitle, value);
  };
  expectCarouselNextButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.nextButton, "class", /next swiper-button-disabled/);
  };
  expectCarouselPrevButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.prevButton, "class", /prev swiper-button-disabled/);
  };
  expectProductToHaveWidth = async (value) => {
    await this.expectElementsToHaveJSProperty(this.allMediaProducts , "offsetWidth", value);
  };
  expectProductToHaveHeight = async (value) => {
    await this.expectElementsToHaveJSProperty(this.allMediaProducts , "offsetHeight", value);
  };
}
