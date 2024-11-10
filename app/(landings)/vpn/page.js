import BasePage from "../../../base/BasePage.js";
import Header from "../../(landings)/vpn/Header.js";
import FAQ from "../../../components/FAQ.js";
import { expect } from "@playwright/test";
import fs from 'fs';
export default class VpnPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.faq =  new FAQ(page);
     //Locators
    this.allContent = this.page.locator("main.vpn");
    this.allImages = this.page.locator("main.vpn img:visible")
    this.allLinks = (name) => this.page.getByRole("link", { name: name });
    this.allLinksInSecondQuestions = (name) => this.page.getByRole("link", { name: name });
    this.allButtons = this.page.locator("main.vpn .button")
    this.secondQuestion = this.page.getByRole('heading', { name: 'What are the advantages of' })
    this.allQuestions = this.page.locator("h3.question")
    this.windowsLink = this.page.getByRole('link', { name: 'Windows', exact: true })
    this.tryNowThreeDayLink = this.page.getByRole('link', { name: 'Try now 3 days for free (' })
  }
  //Actions
  async open(){
    await this.openPage("/anonymous-vpn")
  }
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
    await this.expectPageToHaveScreenshotWithoutMask(testInfo,this.allImages);
  };

}