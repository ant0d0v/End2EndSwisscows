import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page);
    
    //Locators
    this.root = this.page.locator(".item.product");
    this.name = this.root.locator(".title");
    this.description = this.root.locator(".description");
    this.pricing = this.root.locator(".price b");
    this.link = this.root.locator(".link");
    this.brand = this.root.locator(".brand");
    this.images = this.root.locator(".thumbnail img");
    this.thumbnails = this.root.locator(".thumbnail");
    this.paymentMethodsIcons = this.page.locator(".payment-methods .icon");
  }

  getPriceAllItems = async () => {
    const priceItems = [];
    for (const item of await this.pricing.all()) {
      const text = await item.innerText();
      const amount = parseFloat(text.slice(1));
      priceItems.push(amount);
    }
    return priceItems;
  };
  getTextContentProductItems = async () => {
    const texts = [];
    const elements = await this.name.all();
    for (const element of elements) {
      texts.push(await element.textContent());
    }
    return texts;
  };
  async selectProductAt(products = { number: value }) {
    const items = await this.name.all();
    await items[products.number - 1].click();
  }
  async expectItemsListToHaveCount(value) {
    await this.expectListToHaveCount(this.root, value);
  }
  //Verify
  async expectPaymentIconToBeVisible() {
    await this.icon.expectAreElementsInListDisplayed(this.paymentMethodsIcons);
  }
  async expectPaymentIconsToBeGreaterThan(value) {
    await this.icon.expectListToBeGreaterThanOrEqual(
      this.paymentMethodsIcons,
      value
    );
  }

  async expectInfoProductToContain(
    expectedInfo = {
      name: value,
      pricing: value,
      link: value,
      brand: value,
    }
  ) {
    await this.expectTextsToContains(this.name, expectedInfo.name);
    await this.expectTextsToContains(this.pricing, expectedInfo.pricing);
    await this.expectTextsToContains(this.link, expectedInfo.link);
    await this.expectTextsToContains(this.brand, expectedInfo.brand);
  }
  expectShoppingItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.name);
  };
  expectDescriptionItemsNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.description);
  };
  async expectBrandProductToContain(expectedBrand) {
    await this.expectTextsToContains(this.brand, expectedBrand);
  }
  async expectProductImagesToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.images);
  }

  async expectPaymentIconToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.icon.expectIconsToHaveProperty(
      this.paymentMethodsIcons,
      expected.width,
      expected.height
    );
  }

  async expectProductMediaToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
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
