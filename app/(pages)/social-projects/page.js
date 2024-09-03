import BasePage from "../../../base/BasePage.js";
import ImagesGallery from "../../../components/ImagesGallery.js";
import VideoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
export default class CharityPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.imagesGallery = new ImagesGallery(page);
    this.videoPlayer = new VideoPlayer(page);

    //Locators
    this.allContent = this.page.locator("main.social-project");
    this.mapsImage = this.page.locator("div.map img:visible");
    this.keyshiftLink = this.page.getByRole("link", {
      name: "https://keyshift.com/en/",
    });
  }
  //Actions
  async open() {
    await this.openPage("/social-projects");
  }

  async expectToBeOpenedPageAfterClickKeyshiftLink(expectedLink) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.keyshiftLink, expectedLink
    );
  }
  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.mapsImage,
      this.videoPlayer.videoPlayer
    );
  };
  expectMapsToBeVisible = async () => {
    await this.expectAreElementsToBeVisible(this.mapsImage);
  };
}
