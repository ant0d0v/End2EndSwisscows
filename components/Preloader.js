import BaseComponent from "../base/BaseComponent";
import  expect from "@playwright/test";

export default class Preloader extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.preloader = this.page.locator("three-bounce");
  }
  waitUntilPreloaderToBeInvisible = async () => {
    await this.page.waitForSelector("three-bounce",{ state: 'hidden' })
  };
}
