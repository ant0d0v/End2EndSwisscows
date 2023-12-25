import { BasePage } from "../base/BasePage";
const { expect } = require("@playwright/test");

export class Preloader extends BasePage {
  constructor(page) {
    super(page);
    //Locators
    this.preloader = this.page.locator("three-bounce");
  }
    waitUntilPreloaderToBeInvisible = async () => {
    await expect(this.preloader).toBeHidden()
  };
}
