import { BasePage } from "../../base/BasePage";
import { StaticSlider } from "../../components/StaticSlider";
import { StaticVideoPlayer } from "../../components/StaticVideoPlayer";
const { expect, test } = require("@playwright/test");

export class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.staticSlider = new StaticSlider(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);

    //Locators
    this.links = (id) =>
      this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(this.links(id), `${id}`);
    return newPage;
  }
  //Assert

  expectScreenCharityPage = async () => {
    await this.expectScreenOfPage(this.staticVideoPlayer.videoPlayer);
  };
}
