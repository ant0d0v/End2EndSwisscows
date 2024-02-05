import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.webItems = this.page.locator("article.item-web h2")
  }

  expectWebItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item-web h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.webItems)
  };
}