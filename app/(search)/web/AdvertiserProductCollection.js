import BaseComponent from "../../../base/BaseComponent";

export default class AdvertiserProductCollection extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".widget-products");
    this.widgetTitle = this.page.getByRole("heading", { name: "Products" });
    this.widgetHeader = this.root.locator(".widget-header");
    this.nextButton = this.root.locator(".widget-buttons .next");
    this.prevButton = this.root.locator(".widget-buttons .prev");
    this.adsLink = this.page.getByRole("link", { name: "Ads" });
    this.product = this.root.locator(".product");
    this.title = this.product.locator(".title");
    this.price = this.product.locator(".pricing .price");
    this.shipping = this.product.locator(".pricing .shipping");
    this.site = this.product.locator(".site");
    this.image = this.product.locator("img");
    this.thumbnail = this.product.locator(".thumbnail");
  }
  //Actions
  clickProductAt = async (product = { number: index }) => {
    await this.clickElement(this.product.nth(product.number - 1));
  };

  expectToBeOpenedNewPageAfterClickAdsLink = async (
    expected = { expectedUrl: value }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(this.adsLink, expected.expectedUrl);
  };

  clickUntilNextButtonToBeDisabled = async () => {
    await this.clickUntilElementToBeDisabled(this.nextButton);
  };
  clickUntilPrevButtonToBeDisabled = async () => {
    await this.clickUntilElementToBeDisabled(this.prevButton);
  };

  waitUntilProductAdsToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.root);
  };

  //Verify
  expectLastProductImageToBeInViewport = async () => {
    await this.expectElementToBeInViewport(this.image.last());
  };

  expectFirstProductImageToBeInViewport = async () => {
    await this.expectElementToBeInViewport(this.image.first());
  };

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

  expectThumbnailToHaveProperty = async (
    expected = { width: value, height: value }
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.thumbnail,
      "offsetWidth",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.thumbnail,
      "offsetHeight",
      expected.height
    );
  };
}
