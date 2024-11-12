import BaseComponent from "../../../base/BaseComponent.js";
import ProxyImage from "../../../components/ProxyImage.js";


export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.proxyImage = new ProxyImage(page);

    //Locators
    this.root = this.page.locator(".news-results .item");
    this.images = this.root.locator(".thumbnail img");
    this.title = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site");
    this.date = this.root.locator(".date");
  }
  //Actions
  getTextContentNewsItems = async () => {
    const texts = [];
    const elements = await this.title.all();
    for (const element of elements) {
      texts.push(await element.textContent());
    }
    return texts;
  };

  clickTitleItemAt = async (titles = { number: Number }) => {
    await this.clickElement(
      this.title.nth(titles.number - 1),
      `${titles.number - 1} item index in search result`
    );
  };

  clickImageItemAt = async (images = { number: Number }) => {
    await this.clickElement(
      this.images.nth(images.number - 1),
      `${images.number - 1} image item index in search result`
    );
  };

  // Verify
 
  expectNewsItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.title);
  };

  expectImageItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.images);
  };

  expectNewsResultToHaveCount = async (value) => {
    await this.expectListToHaveCount(this.root, value);
  };

  async expectNewsInfoToContain(
    expectedInfo = {
      title: String,
      site: String,
      date: String
    }
  ) {
    await this.expectTextsToContains(this.title, expectedInfo.title);
    await this.expectTextsToContains(this.site, expectedInfo.site);
    await this.expectTextsToContains(this.date, expectedInfo.date);
  }

  expectItemDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.description);
  };

  expectAllImagesToHaveAttribute = async (value) => {
    await this.proxyImage.expectAttributeSrcAllImagesToHave(this.images, value);
  };
}