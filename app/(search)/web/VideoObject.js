import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
import Summary from "./Summary.js";
export default class VideoObject extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    this.summary = new Summary(page)
    //Locators
    this.root = this.page.locator("article.item.video-object");
    this.titles = this.root.locator(".title");
    this.sites = this.root.locator(".site");
    this.views = this.root.locator(".views")
    this.descriptions = this.root.locator(".description");
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

  expectVideoObjectItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  expectItemsDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.descriptions);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      title: String,
      views: String,
      site: String
  }) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.views, expectedInfo.views);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
  }
  
  expectThumbnailsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.thumbnails);
  };
}
