import { BasePage } from '../base/BasePage';
const { expect } = require('@playwright/test');
const testData = JSON.parse(
  JSON.stringify(require("../data/static-slider/testData.json"))
);

export class StaticSlider extends BasePage {
  constructor(page) {
    super(page);

    //Locators
    this.charityHaitiSliderImages = (id) => this.page.locator(`div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`).first();
    this.charityColumbiaSliderImages = (id) => this.page.locator(`div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(${id})`);
    this.charityColumbiaSliderFirstImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(1)"
    );
    this.charityColumbiaSliderLastImage = this.page.locator(
      "div:nth-child(16) > div:nth-child(2) > .swiper-wrapper > div:nth-child(9)"
    );
    this.charityHaitiSliderFirstImage = this.page.locator(
      "div:nth-child(2) > .swiper-wrapper > div:nth-child(2)"
    ).first();
    this.charityHaitiSliderLastImage = this.page.locator(
      "div:nth-child(2) > .swiper-wrapper > div:nth-child(10)"
    ).first();
  }

  //Actions
  async expectBorderWhenClickingOnImages(elements, expectedValue) {
    for (const { imageID } of await testData.idImagesOfSlider) {
      await elements(imageID).click();
      await expect(elements(imageID)).toHaveCSS("border", expectedValue);
    }
  }
  async swipeLeft(firstImage, lastImage) {
    await firstImage.hover();
    await this.page.mouse.down();
    await lastImage.hover({ force: true });
    await this.page.mouse.up();
    await lastImage.click();
  }
}

