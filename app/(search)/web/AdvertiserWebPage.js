import BaseComponent from "../../../base/BaseComponent.js";

export default class Advertiser extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".item.a8r-web-page");
    this.rating = this.root.locator(".rating");
    this.stars = this.root.locator(".stars");
    this.rate = this.root.locator(".rate");
    this.callout = this.root.locator(".callout");
    this.title = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site");
    this.image = this.root.locator("img");
    this.ad = this.root.locator(".ad");
  }
  //Actions
  clickAdsTitleAt = async (product = { number: Number }) => {
    await this.clickElement(this.title.nth(product.number - 1));
  };

  waitUntilAdvertiserToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.root.first());
  };

  //Verify

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root.first(),
      this.image,
      testInfo
    );
  };

  async expectInfoAdvertiserToContain(
    expectedInfo = {
      title: String,
      site: String,
      callout: String,
      ad: String,
    }
  ) {
    await this.expectTextsToContains(this.title, expectedInfo.title);
    await this.expectTextsToContains(this.site, expectedInfo.site);
    await this.expectTextsToContains(this.callout, expectedInfo.callout);
    await this.expectTextsToContains(this.ad, expectedInfo.ad);
  }

  expectAdvertiserDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.description);
  };
}
