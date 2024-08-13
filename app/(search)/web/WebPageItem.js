import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
export default class WebPageItem extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    //Locators
    this.root = this.page.locator("article.item.web-page");
    this.titles = this.root.locator(".title");
    this.dates = this.root.locator(".date");
    this.sites = this.root.locator(".site");
    this.thumbnails = this.root.locator(".thumbnail img");
    this.previewButton = this.root.locator(".button");
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

  clickTitleAtNumber = async (index) => {
    await this.clickElement(
      this.titles.nth(index),
      `${index} web item in search result`
    );
  };

  clickPreviewButtonAt = async (index) => {
    await this.clickElement(
      this.previewButton.nth(index - 1),
      `${index} preview of item in search result`
    );
  };

  waitWebSocetAfterClickPreviewButtonAt = async (index) => {
    const webSocketPromise = this.page.waitForEvent("websocket");
    await this.clickElement(
      this.previewButton.nth(index - 1),
      `${index} preview of item in search result`
    );
    return await webSocketPromise;
  };
  // Verify

  expectWebPageItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.titles);
  };

  expectItemsDateNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.dates);
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

  expectTitlesToHaveCSS = async (
    expectedCSS = {
      size: value,
      color: value,
    }
  ) => {
    await this.expectElementsToHaveCSS(
      this.titles,
      "font-size",
      expectedCSS.size
    );
    await this.expectElementsToHaveCSS(this.titles, "color", expectedCSS.color);
  };
}
