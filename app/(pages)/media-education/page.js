import BasePage from "../../../base/BasePage.js";
import videoPlayer from "../../../components/VideoPlayer.js";
import Header from "../../(pages)/Header.js";
import  { expect, test } from"@playwright/test";

export default class MediaEducationPage extends BasePage {
  constructor(page) {
    super(page);
    this.videoPlayer = new videoPlayer(page);
    this.header = new Header(page);

    //Locators
    this.allContent = this.page.locator("main.media-education");
    this.allImages = this.page.locator("main.media-education img:visible");
    this.pdfLinks = (id) => this.page.getByRole("link", { name: `${id}` });
    this.links = (id) =>
      this.page.getByRole("link", { name: `${id}`, exact: true });
    this.player = this.page.locator("div.player");
    this.flyerButton = this.page.getByRole("link", {
      name: "Open flyer [PDF, 1.49Mb]",
    });
  }

  //Actions
  async open() {
    await this.openPage("/media-education");
  }

  async clickPdfLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.pdfLinks(id),
      `${id}`
    );
    return newPage;
  }

  async expectToBeOpenedNewPageAfterClickLinks(
    data = {
      locator: element,
      expectedLink: string,
    }
  ) {
    await this.expectToBeOpenedNewPageAfterClick(
      this.links(data.locator),
      data.expectedLink
    );
  }

  //Assert

  takeSnapshot = async (testInfo) => {
    await this.expectPageToHaveScreenshot(
      testInfo,
      this.allImages,
      this.player
    );
  };
  expectColorWhenHoveringOnPdfButton = async (expectedValue) => {
    await this.expectColorLinkWhenHovering(
      this.flyerButton,"background", expectedValue
    );
  };

  async expectValidatePdfFile(
    data = {
      currentUrl: string,
      pdfUrl: string,
    },
    testInfo
  ) {
    await test.step(`Validate pdf when clicking  media education pdf file`, async () => {
      testInfo.snapshotSuffix = "";
      let iframe = `<iframe src="${data.pdfUrl}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
      await data.currentUrl.setContent(iframe);
      await data.currentUrl.waitForTimeout(5000);
      expect(
        await data.currentUrl.locator("iframe").screenshot()
      ).toMatchSnapshot({
        name: `${testInfo.title}.png`,
        maxDiffPixelRatio: 0.5,
      });
    });
  }
}