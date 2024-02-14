import BasePage from "../../../base/BasePage";
import imagesGallery  from "../../../components/ImagesGallery";
import videoPlayer from "../../../components/VideoPlayer";
import HeaderStaticPages from "../../../components/HeaderStaticPages";

export default class DatacenterPage extends BasePage {
  constructor(page) {
    super(page);
    this.imagesGallery = new imagesGallery(page);
    this.videoPlayer = new videoPlayer(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.allContent = this.page.locator("main.datacenter");
    this.links = (id) =>
      this.page.getByRole("main").getByRole("link", { name: `${id}` });
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

  expectScreenDatacenterPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(this.videoPlayer.videoPlayer, testInfo);
  };
}
