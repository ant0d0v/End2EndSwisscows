import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Widget extends BaseComponent {
  constructor(page) {
    super(page);
    this.allImage = this.page.locator('div.widget-images figure.item img')
    this.firstImage = this.page.locator('div.widget-images figure.item').first()
    this.moreVideosButton = this.page.getByRole('link', { name: 'More images' })
    this.titleImagesWidget = this.page.getByText('Images for flowers')
  }
  //Actions
  clickMoreImagesButton = async () => {
    await this.clickElement(this.moreVideosButton, `More Videos button`);
  };
  clickFirstImageAndNavigateToNewPage = async () => {
    return await this.clickElementAndNavigateToNewPage(this.firstImage, `first image in widget`);
   };
   
  //Verify 
  expectImageToHaveWightInWidget = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
}
