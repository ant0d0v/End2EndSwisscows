import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";


export default class Offer extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(page);
    //Locators
    this.root = this.page.locator(".offer");
    this.price = this.root.locator(".pricing .price b");
    this.siteName = this.root.locator(".site");
    this.priceShipping = this.root.locator(".shipping .price");
    this.buyButton = this.page.getByRole("link", { name: "Buy" });
    this.trustedIcon = this.root.locator(".trusted svg");
    this.availability = this.root.locator(".availability");
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
    expected = { siteName: value, pricing: value, priceShipping: value, availability: value }
  ) {
    await this.expectTextsToContains(this.siteName, expected.siteName);
    await this.expectTextsToContains(this.price, expected.pricing);
    await this.expectTextsToContains(this.priceShipping, expected.priceShipping);
    await this.expectTextsToContains(this.availability, expected.availability);
  }

  async expectTrustedIconsToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.trustedIcon);
  }

  async expectTrustedIconsToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.icon.expectIconsToHaveProperty(
      this.trustedIcon,
      expected.width,
      expected.height
    );
  }

  takeSnapshot = async (testInfo, expected = { buttonNumber: value }) => {
    await this.expectPageElementToHaveScreenshot(
      this.buyButton.nth(expected.buttonNumber - 1),
      this.buyButton,
      testInfo
    );
  };
}
