import BaseComponent from "../../../base/BaseComponent.js";
import { expect } from "@playwright/test";

export default class Widget extends BaseComponent {
  constructor(page) {
    super(page);
    this.title = this.page.locator(".widget.widget-video .widget-title")
    this.nextButton = this.page.locator('.widget-video .widget-buttons button.next')
    this.prevButton = this.page.locator('.widget-video .widget-buttons button.prev')
    this.allImage = this.page.locator('.widget-video article.item--video .media.loaded img')
    this.firstVideo = this.page.locator('.widget-video article.item--video .media.loaded img').first()
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
  expectImagesToHaveWightInWidget = async (property, value) => {
    await this.expectElementsToHaveJSProperty(this.allImage , property, value);
  };
  expectNextButtonIsDisabled = async () => {
    await expect(this.nextButton ).toHaveAttribute("disabled");
  };
  expectPrevButtonIsDisabled = async () => {
    await expect(this.prevButton).toHaveAttribute("disabled");
  };
}
