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
   this.itemImage = this.root.locator(".media img")
   this.itemMedia = this.root.locator(".media")

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
  getTextContentProductItems = async () => {
    const texts = [];
    const elements = await this.itemName.all();
    for (const element of elements) {
        texts.push(await element.textContent());
    }
    return texts;
  }
  async openProductDetailsByItem(index) {
    const items = await this.itemName.all();
    await items[index - 1].click(); 
   }
  async expectItemsListToHaveCount(value) {
    await this.expectListToHaveCount(this.root, value)
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
  async expectProductImagesToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.itemImage);
  }
  async expectProductMediaToHaveWidth(value) {
    await this.expectElementsToHaveJSProperty(this.itemMedia, "offsetWidth", value);
  }
  async expectProductMediaToHaveHeight(value) {
    await this.expectElementsToHaveJSProperty(this.itemMedia, " offsetHeight", value);
  }
}
