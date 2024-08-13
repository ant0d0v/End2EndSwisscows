import { type } from "os";
import BaseComponent from "../../../base/BaseComponent.js";
import { expect } from "@playwright/test";

export default class Preview extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".widget-preview ");
    this.screenshotImage = this.root.locator(".screenshot img");
    this.closeButton = this.root.locator("button.close");
    this.openSiteButton = this.page.getByRole("link", { name: "Open site" });
    this.trackers = this.root.locator(".trackers");
    this.verifiedTitle = this.page.getByRole("heading", { name: "Verified!" });
    this.foundTitle = this.page.getByRole("heading", { name: /Found/ });
    this.trakersList = this.root.locator(".trackers li");
    this.navigation = this.root.locator(".navigation");
    this.slide = this.root.locator(".swiper-slide");
    this.nextButton = this.root.locator(".next");
    this.prevButton = this.root.locator(".prev");
    this.more = this.root.locator(".more");
    this.less = this.page.getByText('Less...').first()
    this.description = this.root.locator(".description");
  }

  //Actions

  waitSentEventAndGetPayload = async (webSocket) => {
    const event = await webSocket.waitForEvent("framesent", {
      predicate: (event) => event.payload,
    });
    const sentPayload = JSON.parse(event.payload);
    return sentPayload;
  };

  waitReceivedEventAndGetPayload = async (webSocket) => {
    const received = await webSocket.waitForEvent("framereceived", {
      predicate: (event) => event.payload,
    });
    const receivedPayload = JSON.parse(received.payload);
    return receivedPayload;
  };

  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button in preview `);
  };
  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button in preview `);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button in preview `);
  };
  clickMore = async () => {
    await this.clickElement(this.more, `more link in preview `);
  };
  clickLess = async () => {
    await this.clickElement(this.less, `less link in preview `);
  };
  expectToBeOpenedNewPageAfterClickOpenSiteButton = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.openSiteButton,
      expectedUrl
    );
  };

  // Verify
  takeVerifiedTitleSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.verifiedTitle,
      this.verifiedTitle,
      testInfo
    );
  };
  takeFoundTitleSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.trackers,
      this.trakersList,
      testInfo
    );
  };
  takeNavigationSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.navigation,
      this.navigation,
      testInfo
    );
  };

  expectScreenshotImageToHaveJSProperty = async (
    expectedProperty = {
      height: value,
      width: value,
    }
  ) => {
    await this.expectElementsToHaveJSProperty(
      this.screenshotImage,
      "height",
      expectedProperty.height
    );
    await this.expectElementsToHaveJSProperty(
      this.screenshotImage,
      "width",
      expectedProperty.width
    );
  };

  expectScreenshotImageAtNumberToBeVisible = async (index) => {
    await this.expectElementToBeVisible(this.screenshotImage.nth(index - 1));
  };
  expectScreenshotImageAtNumberToBeHidden = async (index) => {
    await this.expectElementToBeHidden(this.screenshotImage.nth(index - 1));
  };
  expectPrevButtonToBeHidden = async () => {
    await this.expectElementToBeHidden(this.prevButton);
  };
  expectPrevButtonToBeVisible = async () => {
    await this.expectElementToBeVisible(this.prevButton);
  };

  expectAttributeSlideAtNumber = async (
    slider = { slideNumber: number, attribute: string }
  ) => {
    await this.expectAttributeClassOfElement(
      this.slide.nth(slider.slideNumber - 1),
      slider.attribute
    );
  };
  expectDescriptionIs = async (value) => {
    await this.expectAttributeClassOfElement(this.description, value);
  };

  expectWebSocketIsClosed = async (webSocket) => {
    expect(webSocket.isClosed()).toBeTruthy();
  };
}
