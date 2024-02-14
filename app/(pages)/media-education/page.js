import BasePage from "../../../base/BasePage";
import videoPlayer from "../../../components/VideoPlayer";
import HeaderStaticPages from "../../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");

export default class MediaEducationPage extends BasePage {
  constructor(page) {
    super(page);
    this.videoPlayer = new videoPlayer(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.allContent = this.page.locator("main.media-education");
    this.links = (id) => this.page.getByRole("link", { name: `${id}` });
    this.player = this.page.locator("div.player")
    this.flyerButton = this.page.getByRole("link", { name: "Open flyer [PDF, 1.49Mb]" });
  }

  //Actions

  async clickPdfLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(this.links(id), `${id}`);
    return newPage;
  }

  //Assert

  expectScreenMediaEducationPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(this.player, testInfo);
  };

  async expectValidatePdfFile(currentPage, pdf,testInfo) {
    await test.step(`Validate pdf when clicking  media education pdf file`, async () => {
      testInfo.snapshotSuffix = '';
      let iframe = `<iframe src="${pdf}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
      await currentPage.setContent(iframe);
      await currentPage.waitForTimeout(5000);
      expect(await currentPage.locator("iframe").screenshot()).toMatchSnapshot({
        name: `${testInfo.title}.png`,
        maxDiffPixelRatio: 0.5,
      });
    }).catch(async (e) => await this.errorHandling(e, this.page))
  }
}