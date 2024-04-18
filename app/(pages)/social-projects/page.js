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
    this.mapsImage = this.page.locator("div.map img:visible")
    this.links = (id) => this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }
  //Actions
  async open(){
    await this.openPage("/social-projects")
  }

  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.links(id),
      `${id}`
    );
    return newPage;
  }
  //Assert

  expectScreenCharityPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(testInfo, this.mapsImage, this.videoPlayer.videoPlayer );
  };
  expectMapsToBeVisible = async () => {
    await this.page.waitForSelector("div.map img",{ state: 'visible' })
    await this.expectAreElementsInListDisplayed(this.mapsImage)
  };
}
