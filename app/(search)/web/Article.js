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
    this.title = (index) => this.root.locator(".title").nth(index - 1);
    this.dates = this.root.locator(".date");
    this.sites = this.root.locator(".site");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions

  // Verify

  expectArticleItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  expectArticleAuthorNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.author);
  };

  expectItemsSiteNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.sites);
  };

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
