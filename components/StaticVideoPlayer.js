import { BasePage } from '../base/BasePage';
const { expect } = require('@playwright/test');

export class StaticVideoPlayer extends BasePage {
  constructor(page) {
    super(page);
    //Locators
  }

  async playVideo() {
     const videoElement = await this.page.$("video");
     expect(videoElement).not.toBeNull();

     await videoElement.evaluate((video) => {
       video.play();
     });

     await this.page.waitForTimeout(5000);

     const currentTime = await videoElement.evaluate((video) => {
       return video.currentTime;
     });

     expect(currentTime).toBeGreaterThan(0.5);
  }
}

  //   const videoLocator = page.locator('video');
  // const elementLocator = page.getByTestId('element');
  // await expect(videoLocator).toHaveJSProperty('paused', false);
  // await expect(elementLocator).not.toBeVisible();
  // await expect(videoLocator).toHaveJSProperty('ended', true);
  // await expect(elementLocator).toBeVisible();
