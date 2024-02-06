import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Track extends BaseComponent {
  constructor(page) {
    super(page);
   //Locators
   this.musicItems = this.page.locator("article.item--audio h2")
  }

  expectMusicItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--audio h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.musicItems)
  };
}
