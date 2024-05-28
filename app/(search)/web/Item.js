import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.webItems = this.page.locator("article.item.web h2")
    this.firstWebItem = this.page.locator("article.item.web h2").first()
    this.fiveWebItems = this.page.locator("article.item.web:nth-of-type(-n+5) h2")
  }
  //Actions
  getTextContentWebItems = async () => {
    const texts = [];
    const elements = await this.fiveWebItems.all();
    for (const element of elements) {
        texts.push(await element.textContent());
    }
    return texts;
  }
  clickFirstWebItem = async () => {
    return await this.clickElement(this.firstWebItem, `first web item in search result`);
   };
 
  // Verify
  expectWebItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item.web h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.webItems)
  };

  expectWebItemsToContains = async (criteria) => {
    this.expectTextsToContainSearchCriteria(this.fiveWebItems, criteria);
  };
}