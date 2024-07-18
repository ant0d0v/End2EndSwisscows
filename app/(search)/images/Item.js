import BaseComponent from "../../../base/BaseComponent.js";
import ProxyImage from "../../../components/ProxyImage.js";
import { expect,} from "@playwright/test";

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.proxyImage = new ProxyImage(page);

    //Locators
    this.imageItems = this.page.locator(".item.image-object:nth-child(-n+10)");
    this.item = (index) =>this.page.locator(".item.image-object").nth(index - 1);
    this.imageIndex = (index) =>this.page.locator(".item.image-object img").nth(index - 1);
    this.allImages = this.page.locator(".item.image-object img");
  }
  //Actions

  clickItemNumber = async (index) => {
    await this.clickElement(this.item(index), `item with index${index}`);
  };

  getByAltAttributeFirstImage = async (index) => {
    return await this.imageIndex(index).getAttribute("alt");
  };

  scrollByVisibleItemNumber = async (number) => {
    for (let i = 0; i < number; i++) {
      await this.scrollByVisibleElement(this.item(i), "last item");
    }
  };

  //Verify
  expectImageItemsToBeVisible = async () => {
    await this.page.waitForSelector(".item.image-object img", {
      state: "visible",
    });
    await this.expectAreElementsInListDisplayed(this.imageItems);
  };

  expectSecondItemIsActive = async () => {
    await this.expectAttributeClassOfElement(this.item(2), /active/);
  };
  expectFirstItemIsActive = async () => {
    await this.expectAttributeClassOfElement(this.item(1), /active/);
  };
  expectSecondItemIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.item(2), "item--image");
  };
  expectFirstItemIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.item(1), "item--image");
  };
  async expectItemNameToContainText(criteria) {
    for (const image of await this.allImages.all()) {
      await expect(image).toHaveAttribute("alt", criteria);
    }
  }
  expectItemsCount = async (value) => {
    await this.expectListToHaveCount(this.allImages, value);
  };

  expectItemToHaveOutline = async (index, value) => {
    await expect(this.item(index)).toHaveCSS("outline", value);
  };

  expectImageToHaveOpacity = async (index, value) => {
    await expect(this.imageIndex(index)).toHaveCSS("opacity", value);
  };
}
