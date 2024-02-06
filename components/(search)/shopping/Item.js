import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
   //Locators
   this.shoppingItems = this.page.locator("article.item--product h2")
  }

  expectShoppingItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--product h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.shoppingItems)
  };
}
