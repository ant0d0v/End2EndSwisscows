import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
   //Locators
   this.videoItems = this.page.locator("article.item--video h2:nth-child(-n+10)")
  }

  expectVideoItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--video h2:nth-child(-n+10)",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.videoItems)
  };
}