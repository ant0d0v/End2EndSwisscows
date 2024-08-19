import BaseComponent from "../base/BaseComponent.js";
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
    this.charityColumbiaGallerySmallImages = (id) => this.page.locator(`div:nth-child(18) > div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`)
    this.charityColumbiaGalleryLargeImages = (id) => this.page.locator(`div:nth-child(18) > div > .swiper-wrapper > div:nth-child(${id})`).first()
    
    this.dataCenterGallerySmallImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.dataCenterGalleryLargeImages = (id) => this.page.locator(`.swiper-wrapper > div:nth-child(${id})`).first();
  }

  //Actions

  async swipeLeftColumbiaSlider() {
    await this.swipeLeft(
      this.charityColumbiaGallerySmallImages(1),
      this.charityColumbiaGallerySmallImages(9)
    );
    await this.clickElement(this.charityColumbiaGallerySmallImages(9));
  }

  async swipeLeftCharitySlider() {
    await this.swipeLeft(
      this.charityHaitiGallerySmallImages(2),
      this.charityHaitiGallerySmallImages(10)
    );
    await this.clickElement(this.charityHaitiGallerySmallImages(10));
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
    await this.expectAttributeClassOfElement(
      this.charityColumbiaGallerySmallImages(9),
      `swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-fully-${expectedValue}`
    );
  }
   async expectAttributeClassOfLastSmallImageCharityHaitiGallery(expectedValue) {
    await this.expectAttributeClassOfElement(
      this.charityHaitiGallerySmallImages(10),
      `swiper-slide swiper-slide-thumb-active swiper-slide-${expectedValue}`
    );
  }
}

