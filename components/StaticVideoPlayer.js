import { BasePage } from '../base/BasePage';
const { expect } = require('@playwright/test');

export class StaticVideoPlayer extends BasePage {
  constructor(page) {
    super(page);
    //Locators
    this.videoPlayer = this.page.locator("video");
    this.playButtonYouTubeFrame = this.page.frameLocator('iframe').getByLabel('Play', { exact: true })
    this.currentTimeYouTubeFrame = this.page.frameLocator('iframe').locator("span.ytp-time-current")
  }

  async expectVideoToPlay() {
    await this.videoPlayer.evaluate((video) => { video.play() });
    let currentTime;
    const startTime = Date.now();
    do {
      await this.page.waitForTimeout(100); 
      currentTime = await this.videoPlayer.evaluate((video) => {
        return video.currentTime;
      });
    } while (currentTime <= 3 && Date.now() - startTime < 7000);
    expect(currentTime).toBeGreaterThan(0.5);
  }

  async expectYouTubeVideoToPlay() {
    await this.clickElement(this.playButtonYouTubeFrame);
    await this.expectTextsToContains(this.currentTimeYouTubeFrame, "0:01");
  }
  
}