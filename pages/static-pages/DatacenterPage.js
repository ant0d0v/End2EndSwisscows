import AppPage from "../../base/AppPage";
import StaticSlider  from "../../components/StaticSlider";
import StaticVideoPlayer from "../../components/StaticVideoPlayer";
import HeaderStaticPages from "../../components/HeaderStaticPages";

export default class DatacenterPage extends AppPage {
  constructor(page) {
    super(page);
    this.staticSlider = new StaticSlider(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.links = (id) => this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(this.links(id), `${id}`);
    return newPage;
  }
  //Assert

  expectScreenDatacenterPage = async () => {
    await this.expectScreenOfPage(this.staticVideoPlayer.videoPlayer);
  };
}
