import  BasePage  from "../base/BasePage";
import  expect from "@playwright/test";

export default class Preloader extends BasePage {
  constructor(page) {
    super(page);
    //Locators
    this.preloader = this.page.locator("three-bounce");
  }
    waitUntilPreloaderToBeInvisible = async () => {
    await expect(this.preloader).toBeHidden()
  };
}
