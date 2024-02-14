import BasePage from "../../../base/BasePage.js";
const { expect, context } = require("@playwright/test");
import ItemDetails from "../../../components/(search)/images/ItemDetails.js";
import Item from "../../../components/(search)/images/Item.js";
import Header from "../../../components/(search)/Header.js";

export default class ImageMyPage extends BasePage {
  constructor(page) {
    super(page);
    this.itemDetails = new ItemDetails(page);
    this.item = new Item(page);
    this.header  = new Header(page);
  }
}
