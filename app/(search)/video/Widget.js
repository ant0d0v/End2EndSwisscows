import BaseComponent from "../../../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class Widget extends BaseComponent {
  constructor(page) {
    super(page);
    this.title = this.page.locator(".widget.widget-video .widget-title")
    this.nextButton = this.page.locator('div.widget.widget-video button.next')
    this.prevButton = this.page.locator('div.widget.widget-video button.prev')
    this.allImage = this.page.locator('div.widget.widget-video article.item--video img')
    this.firstVideo = this.page.locator('div.widget.widget-video article.item--video img').first()
    this.moreVideosButton = this.page.getByRole('link', { name: 'More videos' })
  }
  //Actions
  clickNextButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.nextButton);
  };
  clickPrevButtonUntilInvisible = async () => {
    await this.clickElementUntilInvisible(this.prevButton);
  };
  clickMoreVideosButton = async () => {
    await this.clickElement(this.moreVideosButton, `More Videos button`);
  };
  waitUntilWidgetToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.title);
  };
  
  //Verify 
  expectImageToHaveWightInWidget = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
  expectNextButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.nextButton ,  "class", /next swiper-button-disabled/);
  };
  expectPrevButtonIsDisabled = async () => {
    await this.expectAttributeToHaveValue(this.prevButton ,  "class", /next swiper-button-disabled/);
  };
}
