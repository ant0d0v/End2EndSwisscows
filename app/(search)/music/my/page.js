import BasePage from "../../../../base/BasePage.js";
import Player from "../Player.js";
import Track from "../Track.js";
import Header from "../../Header.js";
import Error from "../../Error.js";
const { expect, context } = require("@playwright/test");

export default class MusicMyPage extends BasePage {
  constructor(page) {
    super(page);
    this.player = new Player(page);
    this.track = new Track(page);
    this.header  = new Header(page);
    this.error = new Error(page)
  }
}
