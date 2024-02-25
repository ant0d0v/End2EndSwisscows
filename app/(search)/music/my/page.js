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
    //Locators 
    this.titleName = this.page.getByRole('heading', { name: 'My favorite tracks' })
  }
  expectPageToBeOpen = async () => {
    await this.expectHaveUrl(this.page, "https://dev.swisscows.com/en/music/my?query=Skofka")
  };
}
