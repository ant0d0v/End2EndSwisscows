import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js"
import Preloader from "../../../components/Preloader.js";
import {  expect } from "@playwright/test"
export default class ItemDetails extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(this.page);
    this.preloader = new Preloader(this.page);

    //Locators
    this.root = this.page.locator(".details");
    this.image = this.root.locator(".media img");
    this.resolution = this.root.locator(".metadata .resolution");
    this.site = this.root.locator(".site");
    this.media = this.root.locator(".media");
    this.title = this.root.locator(".title");
    this.ghostButton = (name) => this.page.getByRole("button", { name: name });
    this.closeButton = this.root.locator('button[name="close"]');
    this.openSiteButton = this.page.getByRole("link", { name: "Open site" });
  }
  //Actions
  clickGhostButtonByAndGetResponse = async (button = { name: value }) => {
    let response;
    const responsePromise = this.page.waitForResponse(
      `${process.env.API_URL}/v4/user/images`
    );
    await this.clickElement(
      this.ghostButton(button.name),
      `${button.name} button of image`
    );
    response = await responsePromise;
    const responseBody = await response.json();
    return responseBody.id;
  };

  clickGhostButtonBy = async (button = { name: value }) => {
    await this.clickElement(
      this.ghostButton(button.name),
      `${button.name} button of image`
    );
  };

  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button of image`);
  };

  clickOpenSiteButton = async () => {
    await this.clickElement(this.openSiteButton, `Open site button`);
  };

  getAttributeImageBy = async (expected = { attribute: value }) => {
    return await this.image.getAttribute(expected.attribute);
  };

  //Verify

  expectBookmarkButtonIsActive = async () => {
    await this.expectElementToHaveJSProperty(
      this.bookmarkButton,
      "href.animVal",
      "/images/icons.svg#bookmark"
    );
  };

  expectBookmarkButtonIsNotActive = async () => {
    await this.expectElementToHaveJSProperty(
      this.bookmarkButton,
      "href.animVal",
      "/images/icons.svg#bookmark-outline"
    );
  };

  expectImageInDetailsPanelToBeVisible = async () => {
    await this.expectElementToBeVisible(this.image);
  };

  expectDetailsPanelToBeHidden = async () => {
    await this.expectElementToBeHidden(this.root);
  };

  expectDetailsToHaveProperty = async (
    expected = { height: { min: value, max: value }, width: value }
  ) => {
    await this.expectElementToHaveJSProperty(
      this.media,
      "offsetWidth",
      expected.width
    );
    const actualHeight = await this.media.evaluate(
      (element) => element.clientHeight
    );
    const isHeightInRange =
      actualHeight >= expected.height.min &&
      actualHeight <= expected.height.max;
    expect(
      isHeightInRange,
      `Expected height to be between ${expected.height.min}px and ${expected.height.max}px, but received ${actualHeight}px.`
    ).toBe(true);
  };

  expectDetailsToBeInViewport = async () => {
    await this.expectElementToBeInViewport(this.media);
  };

  expectDetailInfoToContainText = async (
    expected = {
      title: value,
      site: value,
      resolution: value,
    }
  ) => {
    await this.expectTextToContain(this.title, expected.title);
    await this.expectTextToContain(this.site, expected.site);
    await this.expectTextToContain(this.resolution, expected.resolution);
  };

  takeSnapshotGhostButtonBy = async (testInfo, button = { name: value }) => {
    await this.expectPageElementToHaveScreenshot(
      this.ghostButton(button.name),
      this.ghostButton(button.name),
      testInfo
    );
  };
  
  expectNotToBeAttachedGhostButtonBy = async (button = { name: value }) => {
    await this.expectElementNotToBeAttached(this.ghostButton(button.name));
  };
}
