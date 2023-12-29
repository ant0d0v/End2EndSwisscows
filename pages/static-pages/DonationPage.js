import { BasePage } from "../../base/BasePage";
import { StaticVideoPlayer } from "../../components/StaticVideoPlayer";
const { expect, test } = require("@playwright/test");

export class DonationPage extends BasePage {
  constructor(page) {
    super(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);

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

  expectScreenDonationPage = async () => {
    await this.expectScreenOfPage(this.staticVideoPlayer.videoPlayer);
  };

  async expectValidatePdfFile(currentPage, pdf) {
    await test
      .step(`Validate pdf when clicking  ${currentPage}`, async () => {
        let iframe = `<iframe src="${pdf}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
        await currentPage.setContent(iframe);
        await currentPage.waitForTimeout(5000);
        expect(
          await currentPage.locator("iframe").screenshot()
        ).toMatchSnapshot({
          name: `pdf_validation_${pdf}_.png`,
          maxDiffPixelRatio: 0.5,
        });
      })
      .catch(async (e) => await this.errorHandling(e, this.page));
  }
}
