import BasePage from "../../../base/BasePage.js";
import imagesGallery from "../../../components/ImagesGallery.js";
import videoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";

export default class DatacenterPage extends BasePage {
  constructor(page) {
    super(page);
    this.imagesGallery = new imagesGallery(page);
    this.videoPlayer = new videoPlayer(page);
    this.header = new Header(page);

    //Locators
    this.allContent = this.page.locator("main.datacenter");
    this.allImages = this.page.locator("main.datacenter img:visible");
    this.links = (id) =>
      this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions
  async open() {
    await this.openPage("/data-safe-search-engine");
  }

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.links(id),
      `${id}`
    );
    return newPage;
  }
  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.allImages,
      this.videoPlayer.videoPlayer
    );
  };
}
