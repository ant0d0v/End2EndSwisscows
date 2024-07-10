import BaseComponent from "../../../base/BaseComponent.js";

export default class Preview extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.screenshotImage = this.page.locator(".screenshot img");
    this.closeButton = this.page.locator("button.close")
    this.openSiteButton = this.page.getByRole('link', { name: 'Open site' })
    this.trackersButton = this.page.getByText('trackers')
    this.screenshotButton = this.page.getByText('Screenshot', { exact: true })
    this.allTrackers = this.page.locator(".trackers section a");
  }
  //Actions
  
  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button in preview `);
  };
  clickTrackersButton = async () => {
    await this.clickElement(this.trackersButton, `trackers button in preview `);
  };
  clickScreenshotButton = async () => {
    await this.clickElement(this.screenshotButton, `screenshot button in preview `);
  };
  expectToBeOpenedNewPageAfterClickOpenSiteButton = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(this.openSiteButton, expectedUrl)
  };

   // Verify
  expectScreenPreview = async (testInfo) => {
    await this.expectPageToHaveScreenshotWithoutMask(testInfo);
  };

  expectScreenshotImageToBeVisible = async () => {
    await this.expectElementToBeVisible(this.screenshotImage);
  };
  expectScreenshotImageToBeHidden = async () => {
    await this.expectElementToBeHidden(this.screenshotImage);
  };
}
