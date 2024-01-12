import BasePage from "../../base/BasePage";
import  StaticSlider  from "../../components/StaticSlider";
import StaticVideoPlayer from "../../components/StaticVideoPlayer";
import HeaderStaticPages from "../../components/HeaderStaticPages";
export default class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.headerStaticPages = new HeaderStaticPages(page);
    this.staticSlider = new StaticSlider(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);

    //Locators
    this.allContent = this.page.locator("main.social-project");
    this.links = (id) => this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.links(id),
      `${id}`
    );
    return newPage;
  }
  //Assert

  expectScreenCharityPage = async (testInfo) => {
    await this.expectScreenOfPage(this.staticVideoPlayer.videoPlayer, testInfo);
  };
}
