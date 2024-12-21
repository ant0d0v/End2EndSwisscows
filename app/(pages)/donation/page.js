import BasePage from "../../../base/BasePage.js";
import videoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
import { expect, test }from "@playwright/test";

export default class DonationPage extends BasePage {
  constructor(page) {
    super(page);
    this.pagePath = "/donation"
    this.videoPlayer = new videoPlayer(page);
    this.header = new Header(page);

    //Locators
    this.allImages = this.page.locator("main.donation img:visible");
    this.keyshiftLink = this.page.getByRole("link", {
      name: "https://keyshift.com/en/",
    });
  }

  //Actions

  async expectToBeOpenedPageAfterClickKeyshiftLink(expectedLink) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.keyshiftLink,
      expectedLink
    );
  }
  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo, this.allImages);
  };
}
