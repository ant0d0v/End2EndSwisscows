import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";

export default class Infobox extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(this.page);

    //Locators
    this.root = this.page.locator(".widget-infobox");
    this.title = this.root.locator(".title");
    this.header = this.root.locator("header");
    this.image = this.header.locator("img");
    this.more = this.root.locator(".more");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site a");
    this.profiles = this.root.locator(".profiles");
    this.footer = this.root.locator("footer");
    this.footerImage = this.footer.locator("img");
    this.profile = (name) => this.page.getByTitle(name);
  }

  //Actions
  clickMoreButton = async () => {
    await this.clickElement(this.more, `more button`);
  };
  clickSiteLink = async () => {
    await this.clickElement(this.site, `site link`);
  };
  selectProfileBy = async (profiles = { name: value }) => {
    await this.clickElement(
      this.profile(profiles.name),
      `select ${profiles.name} profile `
    );
  };

  // Verify
  expectInfoboxToHaveCountProfiles = async (value) => {
    await this.expectListToHaveCount(this.profiles, value);
  };

  expectItemsDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.descriptions);
  };

  async expectInfoboxToContain(
    expectedInfo = {
      description: value,
      site: value,
      date: value,
    }
  ) {
    await this.expectTextsToContains(
      this.description,
      expectedInfo.description
    );
    await this.expectTextsToContains(this.site, expectedInfo.site);
  }

  expectImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.image);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshotWithMask(
      this.header,
      this.header,
      this.image,
      testInfo
    );
  };
  takeSnapshotMoreButton = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.more,
      this.more,
      testInfo
    );
  };
  takeSnapshotFooter = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.footer,
      this.footerImage,
      testInfo
    );
  };
}
