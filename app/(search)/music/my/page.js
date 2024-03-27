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
    this.playlist = this.page.getByRole('link', { name: /My favorite tracks/ })
  }
  //Verify
  expectPageUrlToHaveParameter = async (query) => {
    const expectedUrlPattern = new RegExp(`${process.env.BASE_URL}/en/music/my\\${query}`);
    await this.expectHaveUrl(this.page, expectedUrlPattern);
  };
}
