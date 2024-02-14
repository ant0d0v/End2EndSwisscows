import BasePage from "../../../base/BasePage";
import Header from "../../(landings)/vpn/Header";
import FAQ from "../../../components/FAQ";
const { expect } = require("@playwright/test");
import fs from 'fs';
export default class VpnPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.faq =  new FAQ(page);
     //Locators
    this.allContent = this.page.locator("main.vpn");
    this.allLinks = (name) => this.page.getByRole("link", { name: name });
    this.allLinksInSecondQuestions = (name) => this.page.getByRole("link", { name: name });
    this.allButtons = this.page.locator("main.vpn .button")
    this.secondQuestion = this.page.getByRole('heading', { name: 'What are the advantages of' })
    this.allQuestions = this.page.locator("h3.question")
    this.windowsLink = this.page.getByRole('link', { name: 'Windows', exact: true })
    this.tryNowThreeDayLink = this.page.getByRole('link', { name: 'Try now 3 days for free (' })
  }
  //Actions
  async clickAllLinksAndNavigateToNewPage(id) {
    await this.page.waitForSelector('h3.question', { state: 'visible' });
    const newPage = await this.clickElementAndNavigateToNewPage( this.allLinks(id),`${id}`);
    return newPage;
  }
  clickLinkInTheSecondQuestionAndNavigateToNewPage = async (name) => {
    const newPage = await this.clickElementAndNavigateToNewPage( this.allLinksInSecondQuestions(name),
      `${name} link in the four question`
    );
    return newPage;
  };
  scrollDownToQuestions = async () => {
    await this.scrollByVisibleElement(this.secondQuestion, `second question in accordion menu`);
  }
  clickSecondQuestion = async () => {
    await this.clickElement( this.secondQuestion,
      `second question in accordion menu`
    );
  };
  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
    return this;
  };
  downloadVpnExtensionFile = async (link) => {
    const downloadPromise = this.page.waitForEvent('download');

    await this.clickElement(link, 'windows link');
  
    const download = await downloadPromise;
    await download.saveAs('./tests/download/' + download.suggestedFilename());
  
    return download;
  }

  //Verify
  expectDownloadFileNameToBe = async (download, name) => {
    expect(download.suggestedFilename()).toBe(name);
  }
  expectFileSizeToBeGreaterThan = async (download, sizeByte) => {
    const filePath = (await download.path()).toString();
    expect((await fs.promises.stat(filePath)).size).toBeGreaterThan(sizeByte);
}
  expectScreenVpnPage = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };

}