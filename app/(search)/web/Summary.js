import { expect } from "@playwright/test";
import BaseComponent from "../../../base/BaseComponent.js";
export default class Summary extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.root = this.page.locator(".widget-summary")
    this.statusbar = this.root.locator(".statusbar");
    this.status = this.statusbar.locator(".status");
    this.text = this.root.locator(".text")
  }

  // Verify
  expectWidgetToBeVisible = async () => {
    await this.expectElementToBeVisible(this.root);
  };
  expectWidgetToBeHidden = async () => {
    await this.expectElementToBeHidden(this.root)
  };

  expectStutusToHaveText = async (value) => {
    await this.expectElementToHaveText(this.status, value);
  };
  expectSummaryTextToContain = async (value) => {
    await this.expectTextToContain(this.text, value);
  };

  expectTextToHaveCountParagraphs({ response, paragraphCount }){ 
    const paragraphs = response
      .split("\n") // Split the text by newline characters
      .map((part) => part.trim()) // Trim any leading or trailing whitespace
      .filter((part) => part.length > 0); // Filter out any empty parts
    expect(paragraphs.length).toEqual(paragraphCount);
  };

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root.first(),
      this.root.first(),
      testInfo
    );
  };
}
