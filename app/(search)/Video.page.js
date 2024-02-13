import BasePage from "../../base/BasePage.js";
import Filters from "../../components/(search)/video/Filters.js";
import ItemDetails from "../../components/(search)/video/ItemDetails.js";
import Item from "../../components/(search)/video/Item.js";
import Player from "../../components/(search)/video/Player.js";
import Header from "../../components/(search)/Header.js";
const { expect, context } = require("@playwright/test");

export default class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.ItemDetails = new ItemDetails(page);
    this.item = new Item(page);
    this.player = new Player(page);
    this.header  = new Header(page);
  }
}
