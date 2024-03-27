import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class AlternateSearch extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.textDidYouMeanMessage = this.page.getByText('Including results for "apple"Do you want results only for appple?')
  }

  //Verify
  expectDidYouMeanMessageToHaveText = async (expectedResult) => {
    await this.expectElementToHaveText(this.textDidYouMeanMessage, expectedResult )
  }
}
