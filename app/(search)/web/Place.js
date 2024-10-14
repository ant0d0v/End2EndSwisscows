import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Rating from "../../../components/Rating.js";
export default class Place extends BaseComponent {
  constructor(page) {
    super(page);
      this.favicon = new Favicon(page);
      this.rating = new Rating(page);
    //Locators
    this.root = this.page.locator("article.item.place");
    this.titles = this.root.locator(".title");
    this.descriptions = this.root.locator(".description");
    this.address = this.root.locator(".address");
    this.pinMarkerIcons = this.address.locator(".icon");
    this.title = (index) => this.root.locator(".title").nth(index - 1);
    this.sites = this.root.locator(".site");
    this.buttons = this.root.locator("button");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions
  clickImageAt = async (thumbnails = { number: index }) => {
    await this.clickElement(
      this.thumbnails.nth(thumbnails.number - 1),
      `${thumbnails.number - 1} image of video object item in search result`
    );
  };

  // Verify

  expectPlaceItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      title: value,
      address: value,
      description: value,
      site: value,
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.address, expectedInfo.address);
    await this.expectTextsToContains(this.descriptions, expectedInfo.description);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
  }
  expectThumbnailsToHaveJSProperty = async (
    expectedProperty = {
      height: value,
      width: value,
    }
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "height",
      expectedProperty.height
    );
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "width",
      expectedProperty.width
    );
  };

  expectThumbnailsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.thumbnails);
  };

  takeSnapshotPinMarkerIcon = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.pinMarkerIcons.first(),
      this.pinMarkerIcons,
      testInfo
    );
  };

  takeSnapshotPreviewIcon = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.buttons.first(),
      this.buttons,
      testInfo
    );
  };
}
