import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Rating from "../../../components/Rating.js";
import Summary from "./Summary.js";
export default class Book extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    this.rating = new Rating(page);
    this.summary = new Summary(page);

    //Locators
    this.root = this.page.locator("article.item.book");
    this.titles = this.root.locator(".title");
    this.descriptions = this.root.locator(".description");
    this.author = this.root.locator(".author");
    this.rating = this.root.locator(".rating");
    this.rate = this.rating.locator(".rate");
    this.sites = this.root.locator(".site");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions
  clickImageAt = async (thumbnails = { number: Number }) => {
    await this.clickElement(
      this.thumbnails.nth(thumbnails.number - 1),
      `${thumbnails.number - 1} image of book type item in search result`
    );
  };

  // Verify

  expectBookItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      title: String,
      author: String,
      rate: String,
      description: String,
      site: String,
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.author, expectedInfo.author);
    await this.expectTextsToContains(this.rate, expectedInfo.rate);
    await this.expectTextsToContains(this.descriptions, expectedInfo.description);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
  }

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
