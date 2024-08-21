import BaseComponent from "../base/BaseComponent.js";
export default class Icon extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.paymentMethods = this.page.locator(
      ".item.product .payment-methods .icon"
    );
    this.paymentMethodsInProductDetails = this.page.locator(
      ".section.payment-methods .icon"
    );
    this.trustedIconInProductDetails = this.page.locator(
      ".product-details .trusted svg"
    );
  }
  //Actions

  // Verify
  async expectPaymentIconToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.paymentMethods,
      "clientWidth",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.paymentMethods,
      "clientHeight",
      expected.height
    );
  }
  async expectPaymentIconToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.paymentMethods);
  }
  async expectPaymentIconsToBeGreaterThan(value) {
    await this.expectListToBeGreaterThanOrEqual(this.paymentMethods, value);
  }

  async expectPaymentIconDetailsToBeVisible() {
    await this.expectAreElementsInListDisplayed(
      this.paymentMethodsInProductDetails
    );
  }
  async expectTrustedIconsToBeVisible() {
    for (const icon of await this.trustedIconInProductDetails.all()) {
      await icon.scrollIntoViewIfNeeded();
      await this.expectElementToBeVisible(icon);
    }
  }
  async expectTrustedIconsToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.trustedIconInProductDetails,
      "clientWidth",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.trustedIconInProductDetails,
      "clientHeight",
      expected.height
    );
  }
}
