import BasePage from "../../base/BasePage";
import StaticVideoPlayer from "../../components/StaticVideoPlayer";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");

export default class DonationPage extends BasePage {
  constructor(page) {
    super(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.pdfLinks = (id) => this.page.getByText(`${id}`);
    this.links = (id) =>
      this.page.getByRole("main").getByRole("link", { name: `${id}` });
  }

  //Actions

  async clickPdfLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.pdfLinks(id),
      `${id}`
    );
    return newPage;
  }
  async clickLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(
      this.links(id),
      `${id}`
    );
    return newPage;
  }

  //Assert

  expectScreenDonationPage = async (testInfo) => {
    await this.expectPageToHaveScreenshot(this.staticVideoPlayer.videoPlayer, testInfo);
  };

  async expectValidatePdfFile(currentPage, pdf, testInfo) {
    await test
      .step(`Validate pdf when clicking  Download payment slip`, async () => {
        testInfo.snapshotSuffix = '';
        let iframe = `<iframe src="${pdf}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
        await currentPage.setContent(iframe);
        await currentPage.waitForTimeout(5000);
        expect(
          await currentPage.locator("iframe").screenshot()
        ).toMatchSnapshot({
          name: `pdf_validation_${testInfo.title}_.png`,
          maxDiffPixelRatio: 0.5,
        });
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
}
