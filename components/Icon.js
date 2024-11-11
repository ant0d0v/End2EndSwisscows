import BaseComponent from "../base/BaseComponent.js";
export default class Icon extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
  
  }
  //Actions
  

  // Verify
 
  async expectIconsToHaveProperty(element, width, height) {
    await this.expectElementsToHaveJSProperty(element, "clientWidth", width);
    await this.expectElementsToHaveJSProperty(element, "clientHeight", height);
  }

  takeSnapshotIconAt = async (testInfo, element, index ) => {
    await this.expectPageElementToHaveScreenshot(
      element.nth(index - 1),
      element,
      testInfo
    );
  }
}
