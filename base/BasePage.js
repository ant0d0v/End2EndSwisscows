import { expect,test} from "@playwright/test";
import BaseComponent from "./BaseComponent.js";
import { base } from "@faker-js/faker";
export default class BasePage extends BaseComponent {
  constructor(page) {
    super(page);
    this.pagePath = ""
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
    await test.step("Navigate to the previous page in history.", async () => {
      await this.page.goBack();
    });
  }

  async waitUntilPageIsFullyLoaded() {
    await test.step("Wait for all network requests for images to complete", async () => {
      await this.page.waitForLoadState("networkidle");
    });
  }

  //Verify

  async expectPageToHaveScreenshot(testInfo, elements, element) {
    await test.step(`Expect screen to be equal to the snapshot of page`, async () => {
      testInfo.snapshotSuffix = "";
      const imageElements = await elements.all();
      for (const image of imageElements) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).not.toHaveJSProperty("naturalWidth", 0);
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
        await image.scrollIntoViewIfNeeded();
        await expect(image).not.toHaveJSProperty("naturalWidth", 0);
      }
      await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`, {
        fullPage: true,
      });
    });
  }
}

