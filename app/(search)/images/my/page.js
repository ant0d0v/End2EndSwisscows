import BasePage from "../../../../base/BasePage.js";
import { expect } from "@playwright/test";
import ItemDetails from "../ItemDetails.js";
import Item from "../Item.js";
import Header from "../../Header.js";

export default class ImageMyPage extends BasePage {
  constructor(page) {
    super(page);
    this.item = new Item(page);
    this.itemDetails = new ItemDetails(page);
    this.header  = new Header(page);
  }
  //Verify
  expectPageUrlToHaveParameter = async (query) => {
    const expectedUrlPattern = new RegExp(`${process.env.BASE_URL}/en/images/my\\${query}`);
    await expect(this.page).toHaveURL(expectedUrlPattern);
  };
}
