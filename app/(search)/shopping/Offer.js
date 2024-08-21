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
    this.buyButton = this.page.getByRole("link", { name: "Buy" });
  }
  //Actions
  async clickBuyButtonAt(buttons = { number: index }) {
    await this.clickElement(
      this.buyButton.nth(buttons.number - 1),
      "buy button"
    );
  }
  //Verify
  async expectOfferInfoToContain(
    expected = { pricing: value, priceShipping: value }
  ) {
    await this.expectTextsToContains(this.price, expected.name);
    await this.expectTextsToContains(
      this.priceShipping,
      expected.priceShipping
    );
  }
  expectPriceNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.price);
  };
  expectNameNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.name);
  };

  takeSnapshot = async (testInfo, expected = { buttonNumber: value }) => {
    await this.expectPageElementToHaveScreenshot(
      this.buyButton.nth(expected.buttonNumber - 1),
      this.buyButton,
      testInfo
    );
  };
}
