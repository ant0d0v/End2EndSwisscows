import BaseComponent from "../../../base/BaseComponent";
import Icon from "../../../components/Icon";
const { expect } = require("@playwright/test");

export default class Offer extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page)
    //Locators
    this.root = this.page.locator("item--offer")
    this.price = this.root.locator(".price-info .price b")
    this.priceShipping = this.root.locator(".price-info .price.shipping")
  }

  //Verify
  async expectOfferInfoToContain(expectedName, expectedPriceShipping) {
    await this.expectTextsToContains(this.price, expectedName);
    await this.expectTextsToContains(this.priceShipping, expectedPriceShipping);
  }
}
