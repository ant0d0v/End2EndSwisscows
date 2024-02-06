import BaseComponent from "../../../base/BaseComponent";

const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.newsItems = this.page.locator("article.item--news h2")
  }

  expectNewsItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--news h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.newsItems)
  };
}