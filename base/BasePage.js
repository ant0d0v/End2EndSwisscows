import { expect,test} from "@playwright/test";
import BaseComponent from "./BaseComponent.js";
export default class BasePage extends BaseComponent {
  constructor(page) {
    super(page);
    this.pagePath = "";
  }
  //Actions
  async open(path = this.pagePath) {
    await this.page.goto(path);
  }

  async reloadPage() {
    await test.step("Refresh current page", async () => {
      await this.page.reload("domcontentloaded");
    });
  }
  
  async goBack() {
    await test.step("Navigate to the previous page", async () => {
      await this.page.goBack();
    });
  }

  //Verify

  async expectPageToHaveScreenshot(testInfo, elements, element) {
    await test.step(`Expect screen to be equal to the snapshot of page`, async () => {
      testInfo.snapshotSuffix = "";
      const imageElements = await elements.all();
      for (const image of imageElements) {
        await this.waitElementIsLoaded(image)
      }
      await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`, {
        fullPage: true,
        mask: [await element],
      });
    });
  }

  async expectPageToHaveScreenshotWithoutMask(testInfo, elements) {
    await test.step("Expect screen to be equal to the snapshot of page", async () => {
      testInfo.snapshotSuffix = "";
      const imageElements = await elements.all();
      for (const image of imageElements) {
        await this.waitElementIsLoaded(image)
      }
      await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`, {
        fullPage: true,
      });
    });
  }
}

