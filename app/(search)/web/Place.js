import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Rating from "../../../components/Rating.js";
import Summary from "./Summary.js";
export default class Place extends BaseComponent {
  constructor(page) {
    super(page);
      this.favicon = new Favicon(page);
      this.rating = new Rating(page);
      this.summary = new Summary(page)
    //Locators
    this.root = this.page.locator("article.item.place");
    this.titles = this.root.locator(".title");
    this.descriptions = this.root.locator(".description");
    this.address = this.root.locator(".address");
    this.pinMarkerIcons = this.address.locator(".icon");
    this.title = (index) => this.root.locator(".title").nth(index - 1);
    this.sites = this.root.locator(".site");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions
  clickImageAt = async (thumbnails = { number: Number }) => {
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
      title: String,
      address: String,
      description: String,
      site: String,
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.address, expectedInfo.address);
    await this.expectTextsToContains(this.descriptions, expectedInfo.description);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
  }
  expectThumbnailsToHaveJSProperty = async (
    expectedProperty = {
      height: Number,
      width: Number,
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

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root.first(),
      this.thumbnails,
      testInfo
    );
  };
}
