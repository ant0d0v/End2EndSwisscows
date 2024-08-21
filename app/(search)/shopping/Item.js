import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page);
    //Locators
    this.root = this.page.locator(".item.product");
    this.itemName = this.root.locator(".title");
    this.itemDescription = this.root.locator(".description");
    this.itemPricing = this.root.locator(".price b");
    this.itemLink = this.root.locator(".link");
    this.itemBrand = this.root.locator(".brand");
    this.images = this.root.locator(".thumbnail img");
    this.thumbnails = this.root.locator(".thumbnail");
  }
  getPriceAllItems = async () => {
    const priceItems = [];
    for (const item of await this.itemPricing.all()) {
      const text = await item.innerText();
      const amount = parseFloat(text.slice(1));
      priceItems.push(amount);
    }
    return priceItems;
  };
  getTextContentProductItems = async () => {
    const texts = [];
    const elements = await this.itemName.all();
    for (const element of elements) {
      texts.push(await element.textContent());
    }
    return texts;
  };
  async selectProductAt(products = { number: value}) {
    const items = await this.itemName.all();
    await items[products.number - 1].click();
  }
  async expectItemsListToHaveCount(value) {
    await this.expectListToHaveCount(this.root, value);
  }
  //Verify
  async expectInfoProductToContain(
    expectedInfo = {
      name: value,
      pricing: value,
      link: value,
      brand: value,
    }
  ) {
    await this.expectTextsToContains(this.itemName, expectedInfo.name);
    await this.expectTextsToContains(this.itemPricing, expectedInfo.pricing);
    await this.expectTextsToContains(this.itemLink, expectedInfo.link);
    await this.expectTextsToContains(this.itemBrand, expectedInfo.brand);
  }
  expectShoppingItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.itemName);
  };
  expectDescriptionItemsNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.itemDescription);
  };
  async expectBrandProductToContain(expectedBrand) {
    await this.expectTextsToContains(this.itemBrand, expectedBrand);
  }
  async expectProductImagesToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.images);
  }
  async expectProductMediaToHaveProperty( expected = {
      width: value,
      height: value,
    }) {
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "offsetWidth",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.thumbnails,
      "offsetHeight",
      expected.height
    );
  }
}
