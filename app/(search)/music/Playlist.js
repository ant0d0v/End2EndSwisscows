import BaseComponent from "../../../base/BaseComponent.js";
export default class Playlist extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.widget = this.page.locator(".widget");
    this.playlist = this.widget.locator(".audio-playlist");
    this.header = this.widget.locator(".widget-header");
    this.trackCount = (index) =>
      this.page.locator(`a[href*="/en/music/playlist?query="] .duration span:first-child`).nth(index - 1);
    this.images = this.widget.locator("img");
    this.nextButton = this.widget.locator("button.next");
    this.prevButton = this.widget.locator("button.prev");
    this.slides = this.widget.locator(".swiper-slide");
  }
  //Actions
  async getTextSumTracksOfPlaylistNumber(index) {
    await this.expectElementToHaveText(this.trackCount(index), value);
  }
  async clickNextButton() {
    await this.clickElement(this.nextButton, `next button`);
  }
  async clickPrevButton() {
    await this.clickElement(this.prevButton, `next button`);
  }
  //Verify

  async expectImagesPlaylistToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.images);
  }
  async expectPlaylistsCount(value) {
    await this.expectListToHaveCount(this.images, value);
  }

  async expectImageToHavePropetry(
    expectedProperty = { width: value, height: value }
  ) {
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
  }
  async expectToHaveAttributeSlideAt(
    expected = { number: index, attribute: value }
  ) {
    await this.expectAttributeClassOfElement(
      this.slides.nth(expected.number - 1),
      expected.attribute
    );
  }
  async expectPrevButtonIsDisabled() {
    await this.expectAttributeClassOfElement(this.prevButton, /disabled/);
  }
  async expectNextButtonIsDisabled() {
    await this.expectAttributeClassOfElement(this.nextButton, /disabled/);
  }
  async expectPrevButtonIsEnabled() {
    await this.expectAttributeClassOfElement(this.prevButton, "prev");
  }
  async expectToBeHiddenPlaylistAt(playlist = { number: index }) {
    await this.expectElementToBeHidden(this.playlist.nth(playlist.number - 1));
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshotWithMask(
      this.header,
      this.images,
      this.playlist,
      testInfo
    );
  };
}
