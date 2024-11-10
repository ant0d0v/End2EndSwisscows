import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";
import { expect } from "@playwright/test";

export default class VideoCollection extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(this.page);

    //Locators
    this.root = this.page.locator(".widget.widget-video");
    this.widgetHeader = this.root.locator(".widget-header");
    this.widgetTitle = this.root.locator(".widget-title");
    this.titles = this.root.locator(".title");
    this.sites = this.root.locator(".site");
    this.nextButton = this.root.locator(".widget-buttons button.next");
    this.prevButton = this.root.locator(".widget-buttons button.prev");
    this.images = this.root.locator(".media.loaded img");
    this.slides = this.root.locator(".swiper-slide");
    this.moreVideosButton = this.page.getByRole("link", {
      name: "More videos",
    });
    this.errorIcon = this.root.locator(".media.loaded .error.icon");
  }
  //Actions
  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button`);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button`);
  };
  clickMoreVideosButton = async () => {
    await this.clickElement(this.moreVideosButton, `More Videos button`);
  };
  waitUntilWidgetToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.widgetTitle);
  };

  //Verify
  async expectToHaveAttributeSlideAt(
    expected = { number: Number, attribute: String }
  ) {
    await this.expectAttributeClassOfElement(
      this.slides.nth(expected.number - 1),
      expected.attribute
    );
  }
  expectAllImagesToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.images);
  };

  expectToBeOpenedNewPageAfterClickImageAt = async (
    expected = { number: Number, expectedUrl: String }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.images.nth(expected.number - 1),
      expected.expectedUrl
    );
  };

  async expectVideoInfoToContain(
    expectedInfo = {
      title: String,
      site: String
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.sites, expectedInfo.site);
  }
  
  takeSnapshotErrorIconAt = async (testInfo, expected = { number: Number }) => {
    const elementHandle = await this.images.first();
    await elementHandle.evaluate((element) => element.setAttribute("src", ""));
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.errorIcon,
      expected.number
    );
  };
}
