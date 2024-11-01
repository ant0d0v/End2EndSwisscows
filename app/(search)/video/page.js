import BasePage from "../../../base/BasePage.js";
import Filters from "./Filters.js";
import Item from "./VideoObject.js";
import Player from "./Player.js";
import Header from "../Header.js";
import Footer from "../Footer.js";
import Error from "../Error.js";

export default class VideoPage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(page);
    this.item = new Item(page);
    this.error = new Error(page);
    this.player = new Player(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    //Locators
    this.root = this.page.locator(`.video-results`);
    this.images = this.page.locator(`.video-object img`);
  }
  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.images);
  };

  async scrollByVisibleLastVideo() {
    for(let i = 0; i < 7; i++){
    await this.scrollByVisibleElement(this.images.last())
    await this.footer.scrollToFooter()
    }
  }
}
