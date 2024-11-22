import BaseComponent from "../../../base/BaseComponent.js";
import Favicon from "../../../components/Favicon.js";

export default class Infobox extends BaseComponent {
  constructor(page) {
    super(page);
    this.favicon = new Favicon(this.page);

    //Locators
    this.root = this.page.locator(".widget-infobox");
    this.title = this.root.locator(".title");
    this.subtitle = this.root.locator(".subtitle");
    this.header = this.root.locator("header");
    this.image = this.header.locator("img");
    this.readMore = this.root.locator(".more");
    this.description = this.root.locator(".description");
    this.site = this.root.locator(".site a");
    this.profiles = this.root.locator(".profiles a");
    this.participants = this.root.locator(".participants a");
    this.participantsImage = this.root.locator(".participants img");
    this.rate = this.root.locator(".rating .rate");
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

  clickParticipantAt = async (participants = { number: Number }) => {
    await this.clickElement(
      this.participants.nth(participants.number - 1),
      "participants link"
    );
  };

  expectToBeOpenedPageAfterSelectProfileBy = async (
    expected = { name: String, url: String }
  ) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.profile(expected.name),
      expected.url
    );
  };

  // Verify
  expectPropertiesToHave = async (property = { hidden: Boolean }) => {
    await this.expectElementToHaveJSProperty(
      this.properties,
      "hidden",
      property.hidden
    );
  };

  expectPropertiesNameAndValueNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.propertyName);
    await this.expectListElementsNotToBeEmpty(this.propertyValue);
  };

  expectListProfilesToHaveCount = async (value) => {
    await this.expectListToHaveCount(this.profiles, value);
  };

  expectListParticipantsToHaveCount = async (value) => {
    await this.expectListToHaveCount(this.participants, value);
  };

  async expectInfoboxToContain(
    expectedInfo = {
      title: String,
      subtitle: String,
      description: String,
      site: String,
      rate: String,
    }
  ) {
    await this.expectTextsToContains(this.title, expectedInfo.title);
    await this.expectTextsToContains(this.subtitle, expectedInfo.subtitle);
    await this.expectTextsToContains(
      this.description,
      expectedInfo.description
    );
    await this.expectTextsToContains(this.site, expectedInfo.site);
    if (expectedInfo.rate) {
      await this.expectTextsToContains(this.rate, expectedInfo.rate);
    }
  }

  expectImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.image);
  };

  async expectParticipantsImageToHavePropetry(
    expectedProperty = { width: value, height: value, complete: value }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.participantsImage,
      "width",
      expectedProperty.width
    );
    await this.expectElementsToHaveJSProperty(
      this.participantsImage,
      "height",
      expectedProperty.height
    );
    await this.expectElementsToHaveJSProperty(
      this.participantsImage,
      "complete",
      expectedProperty.complete
    );
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.image,
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
}
