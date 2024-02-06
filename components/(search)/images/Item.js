import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.imageItems = this.page.locator("figure.item--image:nth-child(-n+10)")
  }

  expectImageItemsToBeVisible = async () => {
    await this.page.waitForSelector("figure.item--image",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.imageItems)
  };
}
