import BaseComponent from "../../../base/BaseComponent.js";

export default class AdvertiserProduct extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".item.product.a8r-product");
    this.price = this.root.locator(".price");
    this.shipping = this.root.locator(".shipping");
    this.title = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site");
    this.image = this.root.locator("img");
  }
  //Actions
  clickProductImageAt = async (product = { number: index }) => {
    await this.clickElement(this.image.nth(product.number - 1));
  };

  waitUntilProductAdsToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.root);
  };

  //Verify

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.widgetHeader,
      this.widgetHeader,
      testInfo
    );
  };

  expectTitleAdsToHaveText = async (value) => {
    await this.expectElementToHaveText(this.textProductsAds, value);
  };

  async expectInfoProductToContain(
    expectedInfo = {
      title: value,
      price: value,
      site: value,
      shipping: value,
    }
  ) {
    await this.expectTextsToContains(this.title, expectedInfo.title);
    await this.expectTextsToContains(this.price, expectedInfo.price);
    await this.expectTextsToContains(this.site, expectedInfo.site);
    await this.expectTextsToContains(this.shipping, expectedInfo.shipping);
  }

  expectProductDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.description);
  };

  expectThumbnailToHaveProperty = async (
    expected = { width: value, height: value }
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.image,
      "width",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.thumbnail,
      "height",
      expected.height
    );
  };
}