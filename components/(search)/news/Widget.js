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
  clickFirstNewsAndNavigateToNewPage = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstNews, `first news in widget`);
   };
    //Verify 
  expectImageToHaveWightInWidget = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
}
