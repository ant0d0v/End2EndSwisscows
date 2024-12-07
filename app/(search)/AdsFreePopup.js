import BaseComponent from "../../base/BaseComponent.js";
export default class AdsFreePopup extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.root = this.page.locator(".popover.ads-free")
    this.image = this.root.locator("img")
    this.closeButton = this.page.locator(".icon.close");
    this.startButton = this.page.locator(".button.action")
    
  }
  //Actions
  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button in the popup`);
  };

  getNewPageAfterClickStartButton = async () => {
    return await this.clickElementAndNavigateToNewPage(this.startButton, `start button in the popup`);
  };
  
  closePopup = async () => {
    await this.page.addLocatorHandler(
        this.closeButton,
        async () => {
          await this.clickCloseButton();
        });
  };

  //Verify
  expectPopupToBeHidden = async () => {
    await this.expectElementToBeHidden(this.root);
  };
  expectPopupToBeVisible = async () => {
    await this.expectElementToBeVisible(this.root);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.image,
      testInfo
    );
  };
}
