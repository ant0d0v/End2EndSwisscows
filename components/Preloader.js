import BaseComponent from "../base/BaseComponent.js";
export default class Preloader extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.preloader = this.page.locator("three-bounce");
  }
  waitUntilPreloaderToBeHidden = async () => {
    await this.page.waitForSelector("three-bounce",{ state: 'hidden' })
  };
}
