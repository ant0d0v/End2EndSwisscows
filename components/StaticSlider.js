import BaseComponent from "../base/BaseComponent";
import { expect } from '@playwright/test';
const testData = JSON.parse(
  JSON.stringify(require("../data/static-slider/testData.json"))
);

export default class StaticSlider extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.charityHaitiSliderSmallImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`).first();
    this.charityHaitiSliderLargeImages = (id) => this.page.locator(`.swiper-wrapper > div:nth-child(${id})`).first();
    this.charityColumbiaSliderSmallImages = (id) => this.page.locator(`div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.charityColumbiaSliderLargeImages = (id) => this.page.locator(`div:nth-child(16) > div > .swiper-wrapper > div:nth-child(${id})`).first()
    this.charityColumbiaSliderSmallFirstImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(1)"
    );
    this.charityColumbiaSliderSmallLastImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(9)"
    );
    this.charityHaitiSliderSmallFirstImage = this.page.locator("div:nth-child(2) > .swiper-wrapper > div:nth-child(2)").first();
    this.charityHaitiSliderSmallLastImage = this.page.locator("div:nth-child(2) > .swiper-wrapper > div:nth-child(10)").first();
    this.dataCenterSliderSmallImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.dataCenterSliderLargeImages = (id) => this.page.locator(`.swiper-wrapper > div:nth-child(${id})`).first();
  }

  //Actions
  async swipeLeft(firstImage, lastImage) {
    await firstImage.dragTo(lastImage);
    await this.clickElement(lastImage)
  }

  //Assert
  async expectBorderWhenClickingOnSmallImages(elements, expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(elements(imageID));
      await expect(elements(imageID)).toHaveCSS("border", expectedValue);
    }
  }

  async expectAttributeOfLargeImagesWhenClickingInHaitiSlider(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.charityHaitiSliderSmallImages(imageID))
      await this.expectAttributeClassOfElement(this.charityHaitiSliderLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }
  async expectAttributeOfLargeImagesWhenClickingInColumbiaSlider(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.charityColumbiaSliderSmallImages(imageID))
      await this.expectAttributeClassOfElement(this.charityColumbiaSliderLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }

  async expectAttributeOfLargeImagesWhenClickingInDatacenterSlider(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.dataCenterSliderSmallImages(imageID))
      await this.expectAttributeClassOfElement(this.dataCenterSliderLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }

  async expectAttributeClassOfLastSmallImageCharityColumbiaSlider(expectedValue) {
    await this.expectAttributeClassOfElement(this.charityColumbiaSliderSmallLastImage,
      `swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-fully-${expectedValue}`
    );
  }
   async expectAttributeClassOfLastSmallImageCharityHaitiSlider(expectedValue) {
    await this.expectAttributeClassOfElement( this.charityHaitiSliderSmallLastImage,
      `swiper-slide swiper-slide-thumb-active swiper-slide-${expectedValue}`
    );
  }
}

