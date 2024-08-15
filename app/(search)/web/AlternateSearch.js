import BaseComponent from "../../../base/BaseComponent.js";


export default class AlternateSearch extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.textDidYouMeanMessage = this.page.locator(".web-results .message");
  }

  //Verify
  expectDidYouMeanMessageToHaveText = async (expectedResult) => {
    await this.expectElementToHaveText(this.textDidYouMeanMessage, expectedResult )
  }
}
