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
    this.root = this.page.locator(".video-results article.video-object");
    this.thumbnail = this.root.locator(".thumbnail");
    this.playIcon = this.thumbnail.locator(".play.icon");
    this.errorIcon = this.thumbnail.locator(".error.icon");
    this.images = this.root.locator(".thumbnail img");
    this.title = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site");
    this.views = this.root.locator(".views");
    this.date = this.root.locator(".date");
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

  //Verify
  expectAllImagesToHaveAttribute = async (value) => {
    await this.proxyImage.expectAttributeSrcAllImagesToHave(this.images, value);
  };

  expectVideoItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.root);
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

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(this.root.first(), this.images, testInfo);
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
}