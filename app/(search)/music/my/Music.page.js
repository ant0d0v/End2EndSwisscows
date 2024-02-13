import BasePage from "../../../../base/BasePage.js";
import Player from "../../../../components/(search)/music/Player.js";
import Track from "../../../../components/(search)/music/Track.js";
import Header from "../../../../components/(search)/Header.js";
import Error from "../../../../components/Error.js";
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
