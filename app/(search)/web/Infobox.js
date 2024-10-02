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
    this.readMore = this.root.locator(".more");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site a");
    this.profiles = this.root.locator(".profiles");
    this.footer = this.root.locator("footer");
    this.footerImage = this.footer.locator("img");
    this.expandButton = this.root.locator(".expand button");
    this.properties = this.root.locator(".properties");
    this.propertyName = this.properties.locator(".property-name");
    this.propertyValue = this.properties.locator(".property-value");
    this.profile = (name) => this.page.getByTitle(name);
  }

  //Actions
  clickExpandButton = async () => {
    await this.clickElement(this.expandButton, `expend button`);
  };

  clickReadMoreButton = async () => {
    await this.clickElement(this.readMore, `more button`);
  };
  clickSiteLink = async () => {
    await this.clickElement(this.site, `site link`);
  };
  expectToBeOpenedPageAfterSelectProfileBy = async (expected = { name: value, url: value}) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.profile(expected.name), expected.url
    );
  };

  // Verify
  expectPropertiesToHave = async (property = { hidden: value }) => {
    await this.expectElementToHaveJSProperty(this.properties, "hidden", property.hidden);
  };

  expectPropertiesNameAndValueNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.propertyName);
    await this.expectListElementsNotToBeEmpty(this.propertyValue);
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
  takeSnapshotReadMoreButton = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.readMore,
      this.readMore,
      testInfo
    );
  };
  takeSnapshotExpandButton = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.expandButton,
      this.expandButton,
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
