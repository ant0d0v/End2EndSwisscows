import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Widget extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators
    this.firstNews = this.page.locator('div.widget.widget-news a.item--news').first()
    this.allImage = this.page.locator('div.widget.widget-news a.item--news figure.media img')
    this.titleNewsWidget = this.page.getByText('News for news ukraine')
  }
 
    //Verify 
  expectImageToHaveWightInWidget = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
  expectTitleToHaveText = async (value) => {
    await this.expectElementsToHaveJSProperty(this.titleNewsWidget ,value);
  };
}
