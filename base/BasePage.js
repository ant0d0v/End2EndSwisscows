import { expect,test} from "@playwright/test";
import BaseComponent from "./BaseComponent.js";
export default class BasePage extends BaseComponent {
  constructor(page) {
    super(page);
  }
  //Actions
  async openPage(path){
    await this.page.goto(process.env.BASE_URL + path)
  }

  async reloadPage() {
    await test.step("Refresh current page", async () => {
        await this.page.reload("domcontentloaded");
      })
  }
  async goBack() {
    await test.step("Navigate to the previous page in history.", async () => {
        await this.page.goBack();
      })
  }
  
  async waitUntilPageIsFullyLoaded() {
    await test.step("Wait for all network requests for images to complete",
        async () => {
          await await this.page.waitForLoadState("networkidle");
        }
      )
  }
  
  //Verify
  async expectColorsLinksWhenHovering(elements, color, expectedValue) {
    await test.step('Expect the elements in the array to "have" css color with value',
      async () => {
        await expect(elements).toHaveColorsWhenHovering(color,expectedValue)
      })
  }

  async expectColorLinkWhenHovering(element, color, expectedValue) {
    await test.step('Expect the element to "have" css color with value',
      async () => {
        await element.hover();
        await expect(element).toHaveCSS(color, expectedValue);
      }
    )
  }
  async expectPageToHaveText(body, text) {
    await test.step('Expect the Element(s) "to have" a string', async () => {
      await expect(body).toHaveText(text);
    });
  }
  async expectPageToHaveScreenshot(testInfo, elements, element) {
    await test.step(`Expect screen to be equal to the snapshot of page`, async () => {  
        testInfo.snapshotSuffix = '';
        const imageElements = await elements.all();
        for (const image of imageElements) {
          await image.scrollIntoViewIfNeeded();
          await expect(image).not.toHaveJSProperty('naturalWidth', 0);
        }
        await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`,{
          fullPage: true,
          mask: [await element],
        });
      })
  }
  async expectPageToHaveScreenshotWithoutMask(testInfo, elements) {
    await test.step('Expect screen to be equal to the snapshot of page', async () => {
        testInfo.snapshotSuffix = '';
        const imageElements = await elements.all();
        for (const image of imageElements) {
          await image.scrollIntoViewIfNeeded();
          await expect(image).not.toHaveJSProperty('naturalWidth', 0);
        }
        await expect(this.page).toHaveScreenshot(`${testInfo.title}.png`,{
          fullPage: true,
        });
      })
  } 
}

