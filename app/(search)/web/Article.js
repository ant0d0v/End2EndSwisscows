import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
export default class Article extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    //Locators
    this.root = this.page.locator("article.item.article");
    this.titles = this.root.locator(".title");
    this.author = this.root.locator(".author");
    this.dates = this.root.locator(".date");
    this.sites = this.root.locator(".site");
    this.descriptions = this.root.locator(".description");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions
  clickImageAt = async (thumbnails = { number: index }) => {
    await this.clickElement(
      this.thumbnails.nth(thumbnails.number - 1),
      `${thumbnails.number - 1} image of article item in search result`
    );
  };

  // Verify

  expectArticleItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  expectItemsDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.descriptions);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      author: value,
      title: value,
      site: value,
      date: value,
    }
  ) {
    await this.expectTextsToContains(this.author, expectedInfo.author);
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
    await this.expectTextsToContains(this.dates, expectedInfo.date);
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
}
