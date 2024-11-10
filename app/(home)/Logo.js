import BaseComponent from "../../base/BaseComponent.js";
export default class Logo extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.swisscows = this.page.locator(".logo-home img");
  }
    
    //Verify
  expectSwisscowsLogoToBeVisible = async () => {
    await this.expectElementToBeVisible(this.swisscows);
  };

}

