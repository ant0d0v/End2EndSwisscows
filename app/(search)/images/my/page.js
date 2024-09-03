import BasePage from "../../../../base/BasePage.js";
import { expect } from "@playwright/test";
import Details from "../ImageObjectDetails.js";
import Item from "../ImageObject.js";
import Header from "../../Header.js";
import Error from "../../Error.js";

export default class ImageMyPage extends BasePage {
  constructor(page) {
    super(page);
    this.item = new Item(page);
    this.details = new Details(page);
    this.header = new Header(page);
    this.error = new Error(page);
  }
  //Verify
  waitUrlToBeChanged = async () => {
    const expectedUrlPattern = new RegExp(
      `${process.env.BASE_URL}/en/images\\?query=*`
    );
    await expect(this.page).not.toHaveURL(expectedUrlPattern);
  };
}
