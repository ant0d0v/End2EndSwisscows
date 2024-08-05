import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";


export default class Offer extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page);
    //Locators
    this.root = this.page.locator(".offer");
    this.price = this.root.locator(".pricing .price b");
    this.name = this.root.locator(".site");
    this.priceShipping = this.root.locator(".shipping .price");
    this.buyButton = (index) =>
       this.page.getByRole("link", { name: "Buy" }).nth(index - 1);
  }
  //Actions
  async clickBuyButton(index) {
    await this.clickElement(this.buyButton(index), "buy button");
  }
  //Verify
  async expectOfferInfoToContain(expectedName, expectedPriceShipping) {
    await this.expectTextsToContains(this.price, expectedName);
    await this.expectTextsToContains(this.priceShipping, expectedPriceShipping);
  }
  expectPriceNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.price);
  };
  expectNameNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.name);
  };
}
