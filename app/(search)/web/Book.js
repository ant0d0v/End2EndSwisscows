import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Rating from "../../../components/Rating.js";
export default class Book  extends BaseComponent {
  constructor(page) {
    super(page);
      this.favicon = new Favicon(page);
      this.rating = new Rating(page);
    //Locators
    this.root = this.page.locator("article.item.book");
    this.titles = this.root.locator(".title");
    this.descriptions = this.root.locator(".description");
    this.author = this.root.locator(".author");
    this.rating = this.root.locator(".rating");
    this.stars= this.rating.locator(".stars");
    this.starsIcons = this.stars.locator(".icon");
    this.rate = this.rating.locator(".rate");
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

  expectBookItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      title: value,
      author: value,
      rate: value,
      description: value,
      site: value,
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.author, expectedInfo.author);
    await this.expectTextsToContains(this.rate, expectedInfo.rate);
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

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root.first(),
      this.thumbnails,
      testInfo
    );
  };
}
