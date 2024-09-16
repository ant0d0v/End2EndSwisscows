import BaseComponent from "../../../base/BaseComponent.js";
import ProxyImage from "../../../components/ProxyImage.js";
import { expect } from "@playwright/test";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.proxyImage = new ProxyImage(page);

    //Locators
    this.tenItems = this.page.locator(".item.image-object:nth-child(-n+10)");
    this.tenImages = this.page.locator(
      ".item.image-object:nth-child(-n+10) img"
    );
    this.items = this.page.locator(".item.image-object");
    this.lastItem = this.page.locator(".item.image-object:last-of-type");
    this.images = this.page.locator(".item.image-object img");
  }
  //Actions

  clickItemAt = async (items = { number: value }) => {
    await this.clickElement(
      this.items.nth(items.number - 1),
      `item with index${items.number}`
    );
  };

  getByAltAttributeImageAt = async (items = { number: value }) => {
    return await this.images.nth(items.number - 1).getAttribute("alt");
  };

  scrollByVisibleLastItem = async () => {
    await this.scrollByVisibleElement(this.lastItem, "item");
  };

  //Verify
  expectImageItemsToBeVisible = async () => {
    await this.expectAreElementsInListDisplayed(this.tenItems);
  };

  expectItemToHaveAttributeAt = async (
    expected = { number: value, attribute: value }
  ) => {
    await this.expectAttributeClassOfElement(
      this.items.nth(expected.number - 1),
      expected.attribute
    );
  };
 
  async expectItemNameToContainText(criteria) {
    for (const image of await this.tenImages.all()) {
      await expect(image).toHaveAttribute("alt", criteria);
    }
  }
  expectResultToHaveItemsCount = async (value) => {
    await this.expectListToHaveCount(this.items, value);
  };

  expectItemToHaveCSSBy = async (
    expected = { itemNumber: value, outline: value, opacity: value }
  ) => {
    await expect(this.items.nth(expected.itemNumber - 1)).toHaveCSS(
      "outline",
      expected.outline
    );
    await expect(this.images.nth(expected.itemNumber - 1)).toHaveCSS(
      "opacity",
      expected.opacity
    );
  };

  expectAllImagesToHaveAttribute = async (value) => {
    await this.proxyImage.expectAttributeSrcAllImagesToHave(
      this.tenImages,
      value
    );
  };
}
