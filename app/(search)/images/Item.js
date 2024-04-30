import BaseComponent from "../../../base/BaseComponent";
import ProxyImage from "../../../components/ProxyImage";
const { expect, request} = require("@playwright/test");

export default class Item extends BaseComponent {
  constructor(page) {
    super(page);
    this.proxyImage = new ProxyImage(page)

    //Locators
    this.imageItems = this.page.locator("figure.item--image:nth-child(-n+10)")
    this.item = (index) => this.page.locator("figure.item--image").nth(index - 1)
    this.firstImage = this.page.locator(".item--image .image").first()
    this.allImages = this.page.locator(".item--image .image")
  }
  //Actions

  clickItemNumber = async (index) => {
    await this.clickElement(this.item(index),
      `item with index${index}`
    );
  };
  
  getByAltAttributeFirstImage = async () => {
    return await this.firstImage.getAttribute("alt")
  };

  scrollByVisibleItemNumber = async (number) => {
    for(let i = 0;i < number ; i++){
    await this.scrollByVisibleElement(this.item (i), "last item");
    }
  }

  //Verify
  expectImageItemsToBeVisible = async () => {
    await this.page.waitForSelector("figure.item--image",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.imageItems)
  };

  expectSecondItemIsActive = async () => {
    await this.expectAttributeClassOfElement(this.item(2), /active/)
  };
  expectFirstItemIsActive = async () => {
    await this.expectAttributeClassOfElement(this.item(1), /active/)
  };
  expectSecondItemIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.item(2), "item--image")
  };
  expectFirstItemIsNotActive = async () => {
    await this.expectAttributeClassOfElement(this.item(1), "item--image")
  };
  async expectItemNameToContainText(criteria){
    for (const image of await this.allImages.all()) {
      await expect(image).toHaveAttribute("alt", criteria);
    }
  };
  expectItemsCount  = async (value) => {
    await this.expectListToHaveCount(this.allImages, value)
  }
  expectItemToHaveOutline  = async (value) => {
    await expect(this.item(1)).toHaveCSS("outline", value);
  }
}
