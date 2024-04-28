import BaseComponent from "../../../base/BaseComponent";
import Icon from "../../../components/Icon";
const { expect } = require("@playwright/test");

export default class Offer extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page)
    //Locators
    this.root = this.page.locator(".item--offer")
    this.price = this.root.locator(".price-info .price b")
    this.name = this.root.locator(".name")
    this.priceShipping = this.root.locator(".price-info .price.shipping")
  }

  //Verify
  async expectOfferInfoToContain(expectedName, expectedPriceShipping) {
    await this.expectTextsToContains(this.price, expectedName);
    await this.expectTextsToContains(this.priceShipping, expectedPriceShipping);
  }
  expectPriceNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.price)
  };
  expectNameNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.name)
  };

  async expectNewPageNotToHaveUrlAfterClickByOffer(index, expectedUrl){
    await this.expectNewPageNotToHaveUrlAfterClick(this.name.nth(index - 1), expectedUrl)
  }
}
