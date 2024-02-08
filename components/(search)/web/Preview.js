import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Preview extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.contentImageInPreview = this.page.locator("div.screenshot.fade.in img")
    this.previewButton = this.page.getByRole('button', { name: 'preview' }).first()
    this.closeButtonInPreview = this.page.locator("button.close")
    this.openSiteButtonInPreview = this.page.getByRole('link', { name: 'Open site' })
    this.trackersButtonInPreview = this.page.getByText('trackers')
    this.screenshotButtonInPreview = this.page.getByText('Screenshot')
    this.allTrackers = this.page.locator("div.trackers section a")
  }
  //Actions
  clickPreviewButton = async () => {
    await this.clickElement(this.previewButton, `preview button`);
  };
  clickCloseButtonInPreview = async () => {
    await this.clickElement(this.closeButtonInPreview, `close button in preview `);
  };
  clickTrackersButtonInPreview = async () => {
    await this.clickElement(this.trackersButtonInPreview, `trackers button in preview `);
  };
  clickScreenshotButtonInPreview = async () => {
    await this.clickElement(this.screenshotButtonInPreview, `screenshot button in preview `);
  };
  clickOpenSiteButtonInPreview = async () => {
    return await this.clickElementAndNavigateToNewPage(this.openSiteButtonInPreview, `open site button in preview `);
  };

   // Verify
  expectScreenPreview = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };

}
