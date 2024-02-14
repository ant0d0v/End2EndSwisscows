import BaseComponent from "../base/BaseComponent";
import { expect } from '@playwright/test';
const testData = JSON.parse(
  JSON.stringify(require("../data/images-gallery/testData.json"))
);

export default class ImagesGallery extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.charityHaitiGallerySmallImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`).first();
    this.charityHaitiGalleryLargeImages = (id) => this.page.locator(`.swiper-wrapper > div:nth-child(${id})`).first();
    this.charityColumbiaGallerySmallImages = (id) => this.page.locator(`div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.charityColumbiaGalleryLargeImages = (id) => this.page.locator(`div:nth-child(16) > div > .swiper-wrapper > div:nth-child(${id})`).first()
    this.charityColumbiaGallerySmallFirstImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(1)"
    );
    this.charityColumbiaGallerySmallLastImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(9)"
    );
    this.charityHaitiGallerySmallFirstImage = this.page.locator("div:nth-child(2) > .swiper-wrapper > div:nth-child(2)").first();
    this.charityHaitiGallerySmallLastImage = this.page.locator("div:nth-child(2) > .swiper-wrapper > div:nth-child(10)").first();
    this.dataCenterGallerySmallImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.dataCenterGalleryLargeImages = (id) => this.page.locator(`.swiper-wrapper > div:nth-child(${id})`).first();
  }

  //Actions
  async swipeLeftToLastImage(firstImage, lastImage) {
    await this.swipeLeft(firstImage, lastImage)
    await this.clickElement(lastImage)
  }

  //Assert
  async expectBorderWhenClickingOnSmallImages(elements, expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(elements(imageID));
      await expect(elements(imageID)).toHaveCSS("border", expectedValue);
    }
  }

  async expectAttributeOfLargeImagesWhenClickingInHaitiGallery(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.charityHaitiGallerySmallImages(imageID))
      await this.expectAttributeClassOfElement(this.charityHaitiGalleryLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }
  async expectAttributeOfLargeImagesWhenClickingInColumbiaGallery(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.charityColumbiaGallerySmallImages(imageID))
      await this.expectAttributeClassOfElement(this.charityColumbiaGalleryLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }

  async expectAttributeOfLargeImagesWhenClickingInDatacenterGallery(expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await this.clickElement(this.dataCenterGallerySmallImages(imageID))
      await this.expectAttributeClassOfElement(this.dataCenterGalleryLargeImages(imageID), `swiper-slide swiper-slide-${expectedValue}`);
    }
  }

  async expectAttributeClassOfLastSmallImageCharityColumbiaGallery(expectedValue) {
    await this.expectAttributeClassOfElement(this.charityColumbiaGallerySmallLastImage,
      `swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-fully-${expectedValue}`
    );
  }
   async expectAttributeClassOfLastSmallImageCharityHaitiGallery(expectedValue) {
    await this.expectAttributeClassOfElement( this.charityHaitiGallerySmallLastImage,
      `swiper-slide swiper-slide-thumb-active swiper-slide-${expectedValue}`
    );
  }
}

