import BaseComponent from "../base/BaseComponent.js";
export default class Icon extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.paymentMethods = this.page.locator(".item.product .payment-methods .icon")
    this.paymentMethodsInProductDetails = this.page.locator(".section.payment-methods .icon")
    this.offerIconInProductDetails = this.page.locator(".item--offer img")
  }
  //Actions

  // Verify
  async expectPaymentIconToHaveWidthAndHeight(value) {
    await this.expectElementsToHaveJSProperty(this.paymentMethods, "clientWidth", value)
    await this.expectElementsToHaveJSProperty(this.paymentMethods, "clientHeight", value)
  }
  async expectPaymentIconDetailsToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.paymentMethodsInProductDetails)
  }
  async expectOfferIconsDetailsToBeVisible() {
    for (const icon of await this.offerIconInProductDetails.all()) {
      await icon.scrollIntoViewIfNeeded();
      await this.expectElementToBeVisible(icon)
    }
  }
}
