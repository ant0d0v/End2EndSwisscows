import BasePage from "../../../base/BasePage.js";
import Filters from "./Filters.js";
import Item from "./VideoObject.js";
import Player from "./Player.js";
import Header from "../Header.js";
import Error from "../Error.js";

export default class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.item = new Item(page);
    this.error  = new Error(page);
    this.player = new Player(page);
    this.header  = new Header(page);
  }
}
