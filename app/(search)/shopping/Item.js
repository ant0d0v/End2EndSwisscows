import BaseComponent from "../../../base/BaseComponent";
import Icon from "../../../components/Icon";
const { expect } = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page)
    //Locators
   this.root = this.page.locator(".item--product");
   this.itemName = this.root.locator(".title")
   this.itemDescription = this.root.locator(".description")
   this.itemPricing = this.root.locator(".price b")
   this.itemLink = this.root.locator(".link")
   this.itemBrand = this.root.locator(".brand")

  }
  getPriceAllItems  = async () => {
    const priceItems = []
    for(const item of await this.itemPricing.all()){
      const text = await item.innerText()
      const amount = parseFloat(text.slice(1))
      priceItems.push(amount)
    }
    return priceItems
  }
  async openProductDetailsByItem(index) {
    const items = await this.itemName.all();
    await items[index - 1].click(); 
   }

  //Verify
  async expectInfoProductToContain(expectedName, expectedPricing, expectedLink, expectedBrand) {
      await this.expectTextsToContains(this.itemName, expectedName);
      await this.expectTextsToContains(this.itemPricing, expectedPricing);
      await this.expectTextsToContains(this.itemLink, expectedLink)
      await this.expectTextsToContains(this.itemBrand, expectedBrand)
  }
  expectShoppingItemsToBeVisible = async () => {
    await this.page.waitForSelector("article.item--product h2",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.itemName)
  };
  expectDescriptionItemsNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.itemDescription)
  };
  async expectBrandProductToContain(expectedBrand) {
    await this.expectTextsToContains(this.itemBrand, expectedBrand);
  }
}
