import BasePage from "../../../base/BasePage";
import ImagesGallery  from "../../../components/ImagesGallery";
import VideoPlayer from "../../../components/VideoPlayer";
import Header from "../../(pages)/Header";
export default class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.imagesGallery = new ImagesGallery(page);
    this.videoPlayer = new VideoPlayer(page);

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
    await this.expectPageToHaveScreenshot(this.videoPlayer.videoPlayer, testInfo);
  };
}
