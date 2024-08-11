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
  }
  //Actions
  clickUntilNextButtonToBeDisabled = async () => {
    await this.clickUntilElementToBeDisabled(this.nextButton);
  };
  clickUntilPrevButtonToBeDisabled = async () => {
    await this.clickUntilElementToBeDisabled(this.nextButton);
  };
  waitUntilProductAdsToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.widgetTitle);
  };

  clickFirstProductAndNavigateToNewPage = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstProduct);
  };

  //Verify
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.widgetHeader,
      this.widgetHeader,
      testInfo
    );
  };
  expectCarouselImageToHaveWightInProductAds = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage, property, value);
  };
  expectTitleAdsToHaveText = async (value) => {
    await this.expectElementToHaveText(this.textProductsAds, value);
  };
  expectTitleProductsToContains = async (value) => {
    await this.expectTextsToContains(this.allTitle, value);
  };
  expectCarouselNextButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(
      this.nextButton,
      "class",
      /next swiper-button-disabled/
    );
  };
  expectCarouselPrevButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(
      this.prevButton,
      "class",
      /prev swiper-button-disabled/
    );
  };
  expectProductToHaveWidth = async (value) => {
    await this.expectElementsToHaveJSProperty(
      this.allMediaProducts,
      "offsetWidth",
      value
    );
  };
  expectProductToHaveHeight = async (value) => {
    await this.expectElementsToHaveJSProperty(
      this.allMediaProducts,
      "offsetHeight",
      value
    );
  };
}
