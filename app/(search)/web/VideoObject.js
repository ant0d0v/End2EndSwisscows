import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
export default class Article extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    //Locators
    this.root = this.page.locator("article.item.video-object");
    this.titles = this.root.locator(".title");
    this.author = this.root.locator(".author");
    this.title = (index) => this.root.locator(".title").nth(index - 1);
    this.fiveTitles = this.root.locator(":nth-of-type(-n+5) .title");
    this.dates = this.root.locator(".date");
    this.sites = this.root.locator(".site");
    this.thumbnails = this.root.locator(".thumbnail img");
  }
  //Actions
  getTextContentWebItems = async () => {
    const texts = [];
    const elements = await this.fiveTitles.all();
    for (let element of elements) {
      texts.push(await element.textContent());
    }
    return texts;
  };

  // Verify

  expectVideoObjectItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  expectWebItemsToContains = async (criteria) => {
    this.expectTextsToContainSearchCriteria(this.fiveTitles, criteria);
  };

  expectItemsDateNotToBeEmpty = async () => {
    this.expectListElementsNotToBeEmpty(this.dates);
  };

  expectItemsSiteNotToBeEmpty = async () => {
    this.expectListElementsNotToBeEmpty(this.sites);
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

  expectTitlesToHaveCSSFontSizeAndColor = async (size, color) => {
    await this.expectElementsToHaveCSS(this.titles, "font-size", size);
    await this.expectElementsToHaveCSS(this.titles, "color", color);
  };
}
