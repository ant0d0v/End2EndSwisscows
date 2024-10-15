import BaseComponent from "../../../base/BaseComponent.js";
import Player from "./Player.js";
import ProxyImage from "../../../components/ProxyImage.js";
import Icon from "../../../components/Icon.js";
import { expect } from "@playwright/test";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.player = new Player(page);
    this.proxyImage = new ProxyImage(page);
    this.icon = new Icon(page);

    //Locators
    this.root = this.page.locator("article.video-object");
    this.thumbnail = this.root.locator(".thumbnail");
    this.playIcon = this.thumbnail.locator(".play.icon");
    this.errorIcon = this.thumbnail.locator(".error.icon");
    this.images = this.root.locator(".thumbnail img");
    this.title = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site");
    this.views = this.root.locator(".views");
    this.viewsIcon = this.views.locator(".icon");
    this.date = this.root.locator(".date");
    this.link = this.root.locator("a");
  }
  //Actions
  clickVideoImageAt = async (
    video = {
      number: value,
    }
  ) => {
    await this.clickElement(
      this.playIcon.nth(video.number - 1),
      `video item with index${video.number - 1}`
    );
  };
  clickVideoTitleAt = async (
    title = {
      number: value,
    }
  ) => {
    await this.clickElement(
      this.title.nth(title.number - 1),
      `video item with index${title.number - 1}`
    );
  };

  async scrollByVisibleLastVideo() {
    let count = 10;
    while (count <= 40) {
      await this.scrollByVisibleElement(this.root.nth(count - 1));
      count += 10;
    }
  }

  //Verify
  expectAllImagesToHaveAttribute = async (value) => {
    await this.proxyImage.expectAttributeSrcAllImagesToHave(this.images, value);
  };

  expectVideoToHaveAttributeHrefBy = async (
    video = {
      number: value,
      value: string
    }
  ) => {
    await this.expectAttributeToHaveValue(this.link.nth(video.number - 1), "href", video.value);
  };

  expectVideoItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.root);
  };

  expectImageToHaveProperty = async (
    expectedProperty = {
      width: value,
      height: value,
    }
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.images,
      "width",
      expectedProperty.width
    );
    await this.expectElementsToHaveJSProperty(
      this.images,
      "height",
      expectedProperty.height
    );
  };

  expectItemsResponsePublisherToEqual = async (response, expectedPublisher) => {
    const parseResponse = await response.json();
    for (const item of await parseResponse.items) {
      expect(item.publisher).toEqual(expectedPublisher);
    }
  };

  async expectVideoTitleToContain(expectedValue) {
    await this.expectTextsToContains(this.title, expectedValue);
  }

  async expectVideoInfoToContain(
    expectedInfo = { site: value, views: value, date: value }
  ) {
    await this.expectTextsToContains(this.site, expectedInfo.site);
    await this.expectTextsToContains(this.views, expectedInfo.views);
    await this.expectTextsToContains(this.date, expectedInfo.date);
  }

  expectVideoDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.description);
  };

  async expectVideoResultToHaveCount(value) {
    await this.expectListToHaveCount(this.title, value);
  }

  expectVideoImageToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.images);
  };

  takeSnapshotPlayIconAt = async (testInfo, expected = { number: value }) => {
    const elementHandle = await this.images.first();
    await elementHandle.evaluate((element) => element.setAttribute("src", ""));
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.playIcon,
      expected.number
    );
  };
  takeSnapshotErrorIconAt = async (testInfo, expected = { number: value }) => {
    const elementHandle = await this.images.first();
    await elementHandle.evaluate((element) => element.setAttribute("src", ""));
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.errorIcon,
      expected.number
    );
  };
  takeSnapshotViewsIconAt = async (testInfo, expected = { number: value }) => {
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.viewsIcon,
      expected.number
    );
  };
}