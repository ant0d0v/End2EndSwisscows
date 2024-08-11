import BaseComponent from "../../../base/BaseComponent.js";

export default class AdvertiserProduct extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".widget-products .product");
    this.title = this.root.locator(".title");
    this.price = this.root.locator(".pricing .price");
    this.shipping = this.root.locator(".pricing .shipping");
    this.site = this.page.locator(".site");
    this.image = this.page.locator("img");
    this.thumbnail = this.root.locator(".thumbnail");
  }
  //Actions

  clickProductAtNumber = async (index) => {
    return await this.clickElement(this.root.nth(index - 1));
  };

  //Verify

  expectTitleToContain = async (expectedTitle) => {
    await this.expectTextsToContains(this.title, expectedTitle);
  };
  expectPricesNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.price);
  };
  expectShippingsNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.shipping);
  };

  expectThumbnailToHaveWidth = async (value) => {
    await this.expectElementsToHaveJSProperty(
      this.thumbnail,
      "offsetWidth",
      value
    );
  };
  expectThumbnailToHaveHeight = async (value) => {
    await this.expectElementsToHaveJSProperty(
      this.thumbnail,
      "offsetHeight",
      value
    );
  };
}