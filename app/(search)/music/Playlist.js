import BaseComponent from "../../../base/BaseComponent.js";
export default class Playlist extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.root = this.page.locator(".audio-playlist");
    this.widget = this.page.locator(".widget");
    this.widgetHeader = this.page.locator(".widget-header");
    this.trackCount = (index) =>this.page.locator(
          `a[href*="/en/music/playlist?query="] .duration span:first-child`
        )
        .nth(index - 1);
    this.allImages = this.root.locator("img");
    this.nextButton = this.page.locator("header").filter({ hasText: "Playlists" }).getByRole("button").nth(1);
    this.prevButton = this.page.locator("header").filter({ hasText: "Playlists" }).getByRole("button").first();
    this.swiperSlide = (index) => this.page.locator(".widget .swiper-slide").nth(index - 1);
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
  async expectImageToHaveWight(property, value) {
    await this.expectElementsToHaveJSProperty(this.allImages, property, value);
  }
  async expectSwiperSlideIs(index, value) {
    await this.expectAttributeClassOfElement(this.swiperSlide(index), value);
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
  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshotWithMask(
      this.widgetHeader,
      this.allImages,
      this.root,
      testInfo
    );
  };
}
