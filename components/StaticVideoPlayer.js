import { BasePage } from '../base/BasePage';
const { expect } = require('@playwright/test');

export class StaticVideoPlayer extends BasePage {
  constructor(page) {
    super(page);
    //Locators
    this.videoElement = this.page.locator("video");
  }

  async playVideo() {
     await this.videoElement.evaluate((video) => {
       video.play();
     });
     await this.page.waitForTimeout(5000);
     const currentTime = await this.videoElement.evaluate((video) => {
       return video.currentTime;
     });
     expect(currentTime).toBeGreaterThan(0.5);
  }
}