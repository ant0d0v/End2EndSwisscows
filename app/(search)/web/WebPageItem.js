import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";
export default class WebPageItem extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(page);
    //Locators
    this.root = this.page.locator("article.item.web-page");
    this.titles = this.root.locator(".title");
    this.sites = this.root.locator(".site");
    this.descriptions = this.root.locator(".description");
    this.thumbnails = this.root.locator(".thumbnail img");
    this.previewButton = this.root.locator(".button");
  }
  //Actions
  getTextContentWebItems = async () => {
    const texts = [];
    const elements = await this.root.all();
    for (let element of elements) {
      texts.push(await element.textContent());
    }
    return texts;
  };
  scrollToLastItem = async ()  => {
    await this.scrollByVisibleElement(this.root.last(), "search footer")
  };

  clickTitleAt = async (titles = { number: index }) => {
    await this.clickElement(
      this.titles.nth(titles.number - 1),
      `${titles.number - 1} web item in search result`
    );
  };
  clickImageAt = async (images = { number: index }) => {
    await this.clickElement(
      this.thumbnails.nth(images.number - 1),
      `${images.number - 1} web item in search result`
    );
  };

  clickPreviewButtonAt = async (buttons = { number: index }) => {
    await this.clickElement(
      this.previewButton.nth(buttons.number - 1),
      `${buttons.number - 1} preview of item in search result`
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


  expectItemsDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.descriptions);
  };

  async expectItemInfoToContain(
    expectedInfo = {
      title: value,
      site: value
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.sites, expectedInfo.site)
  }

  expectResultsToBeGreaterThanOrEqual = async (value) => {
    await this.expectListToBeGreaterThanOrEqual(this.root, value);
  };

  expectItemsToContains = async (criteria) => {
    await this.expectTextsToContainSearchCriteria(this.titles, criteria);
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
