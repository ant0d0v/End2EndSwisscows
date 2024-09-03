import BaseComponent from "../../../base/BaseComponent.js";
import Offer from "./Offer.js";
import Icon from "../../../components/Icon.js";
import { expect } from "@playwright/test";

export default class Details extends BaseComponent {
  constructor(page) {
    super(page);
    this.offer = new Offer(page);
    this.icon = new Icon(page);
    
    //Locators
    this.root = this.page.locator(".product-details");
    this.detailsMedia = this.root.locator(".media");
    this.detailsImage = this.root.locator(".media img");
    this.closeButton = this.root.locator('button[name ="close"]');
    this.description = this.root.locator(".description");
    this.less = this.page.getByText("Less");
    this.more = this.root.locator(".more");
    this.paymentsList = this.root.locator(".section.payment-methods li");
    this.shippingList = this.root.locator(".section.shipping-methods li");
    this.brandImage = this.root.locator(".branding img");
    this.paymentMethodsIcons = this.root.locator(
      ".section.payment-methods .icon"
    );
  }
  //Actions
  async clickCloseButton() {
    await this.clickElement(this.closeButton, "close button");
  }
  async clickLess() {
    await this.clickElement(this.less, "less button");
  }
  async clickMore() {
    await this.clickElement(this.more, "more button");
  }
  async getTextPaymentItems() {
    const textItems = [];
    for (const item of await this.paymentsList.all()) {
      const text = await item.innerText();
      priceItems.push(text);
    }
    return textItems;
  }

  //Verify
  async expectDetailsImageNotToBeInViewport() {
    await expect(this.detailsImage).not.toBeInViewport();
  }
  async expectBrandImageToBeVisible() {
    await this.expectElementToBeVisible(this.brandImage);
  }
  async expectDetailsPaneToBeVisible() {
    await this.expectElementToBeVisible(this.root);
  }
  async expectDetailsPaneToBeHidden() {
    await this.expectElementToBeHidden(this.root);
  }
  async expectDetailsImageToBeVisible() {
    await this.expectElementToBeVisible(this.detailsImage);
  }
  async expectProductMediaToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.detailsMedia,
      "offsetWidth",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.detailsMedia,
      "offsetHeight",
      expected.height
    );
  }
  async expectBrandImageToHaveProperty(
    expected = {
      width: value,
      height: value,
    }
  ) {
    await this.expectElementsToHaveJSProperty(
      this.brandImage,
      "width",
      expected.width
    );
    await this.expectElementsToHaveJSProperty(
      this.brandImage,
      "height",
      expected.height
    );
  }
  async expectDescriptionToHaveAttribute(value) {
    await this.expectAttributeClassOfElement(this.description, value);
  }
  async expectPaymentListToBeGreaterThanOrEqual(value) {
    await this.scrollByVisibleElement(this.paymentsList.first());
    await this.expectListToBeGreaterThanOrEqual(this.paymentsList, value);
  }
  async expectShippingListToBeGreaterThanOrEqual(value) {
    await this.scrollByVisibleElement(this.shippingList.first());
    await this.expectListToBeGreaterThanOrEqual(this.shippingList, value);
  }
  async expectPaymentIconsToBeVisible() {
    await this.expectAreElementsInListDisplayed(this.paymentMethodsIcons);
  }
}
