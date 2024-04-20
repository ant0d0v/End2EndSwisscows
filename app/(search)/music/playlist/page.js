import BasePage from "../../../../base/BasePage.js";
import Player from "../Player.js";
import Track from "../Track.js";
import Header from "../../Header.js";
import Error from "../../Error.js";
const { expect, context } = require("@playwright/test");

export default class MusicPlaylistPage extends BasePage {
  constructor(page) {
    super(page);
    this.player = new Player(page);
    this.track = new Track(page);
    this.header  = new Header(page);
    this.error = new Error(page)  
  }
  expectPageUrlToHaveParameter = async (query) => {
    const expectedUrlPattern = new RegExp(`${process.env.BASE_URL}/en/music/playlist\\${query}`);
    await expect(this.page).toHaveURL(expectedUrlPattern);
  };
}
