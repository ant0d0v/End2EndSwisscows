import BaseComponent from "../base/BaseComponent";
export default class Icon extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.paymentMethods = this.page.locator(".item--product .payment-methods .icon")
  }
  //Actions

  // Verify
  async expectPaymentIconToHaveWidthAndHeight(value) {
    await this.expectElementsToHaveJSProperty(this.paymentMethods, "clientWidth", value)
    await this.expectElementsToHaveJSProperty(this.paymentMethods, "clientHeight", value)
  }
}
