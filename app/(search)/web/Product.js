import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Rating from "../../../components/Rating.js";
import Summary from "./Summary.js";
export default class Product extends BaseComponent {
  constructor(page) {
    super(page);
      this.favicon = new Favicon(page);
      this.rating = new Rating(page);
      this.summary = new Summary(page)
    //Locators
    this.root = this.page.locator("article.item.product");
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

  expectWebPageItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item.web-page .title", {
      state: "visible",
    });
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

  expectThumbnailsToHaveHeightAndWidth = async (
    valueOfHeight,
    valueOfWidth
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "height",
      valueOfHeight
    );
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "width",
      valueOfWidth
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
