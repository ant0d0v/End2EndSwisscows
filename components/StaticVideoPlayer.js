import { BasePage } from '../base/BasePage';
const { expect } = require('@playwright/test');

export class StaticVideoPlayer extends BasePage {
  constructor(page) {
    super(page);
    //Locators
    this.videoPlayer = this.page.locator("video");
  }

  async expectVideoToPlay() {
     await this.videoPlayer.evaluate((video) => {
       video.play();
     });
     await this.page.waitForTimeout(5000);
     const currentTime = await this.videoPlayer.evaluate((video) => {
       return video.currentTime;
     });
     expect(currentTime).toBeGreaterThan(0.5);
  }
}