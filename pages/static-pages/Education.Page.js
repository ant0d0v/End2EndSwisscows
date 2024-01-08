import BasePage from "../../base/BasePage";
import StaticVideoPlayer from "../../components/StaticVideoPlayer";
import HeaderStaticPages from "../../components/HeaderStaticPages";
const { expect, test } = require("@playwright/test");

export default class EducationPage extends BasePage {
  constructor(page) {
    super(page);
    this.staticVideoPlayer = new StaticVideoPlayer(page);
    this.headerStaticPages = new HeaderStaticPages(page);

    //Locators
    this.links = (id) => this.page.getByRole("link", { name: `${id}` });
    this.flyerButton = this.page.getByRole("link", { name: "Open flyer [PDF, 1.49Mb]" });
  }

  //Actions

  async clickPdfLinkOnThePage(id) {
    const newPage = await this.clickElementAndNavigateToNewPage(this.links(id), `${id}`);
    return newPage;
  }

  //Assert

  expectScreenEducationPage = async () => {
    await this.expectScreenOfPage(this.staticVideoPlayer.videoPlayer);
  };

  async expectValidatePdfFile(currentPage, pdf) {
    await test.step(`Validate pdf when clicking  media education pdf file`, async () => {
      let iframe = `<iframe src="${pdf}#zoom=105%" style="width: 100%;height:100%;border: none;"></iframe>`;
      await currentPage.setContent(iframe);
      await currentPage.waitForTimeout(5000);
      expect(await currentPage.locator("iframe").screenshot()).toMatchSnapshot({
        name: `pdf_validation_page_.png`,
        maxDiffPixelRatio: 0.5,
      });
    }).catch(async (e) => await this.errorHandling(e, this.page))
  }
}