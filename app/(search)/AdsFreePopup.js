import BaseComponent from "../../base/BaseComponent.js";
export default class AdsFreePopup extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.closeButton = this.page.locator(".icon.close");
    
  }
  //Actions
  clickCloseButton = async () => {
    await this.clickElement(this.closeButton, `close button in the popup`);
  };
  
  closePopup = async () => {
    await this.page.addLocatorHandler(
        this.closeButton,
        async () => {
          await this.clickCloseButton();
        });
  };
  //Verify

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root,
      this.swisscowsAppImages,
      testInfo
    );
  };
}
