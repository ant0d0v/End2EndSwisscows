import BaseComponent from "../base/BaseComponent.js";
import{ expect } from "@playwright/test";
export default class Pagination extends BaseComponent {
  constructor(page) {
    super(page);
    this.nextButton = this.page.getByRole('link', { name: 'Next page' })
    this.prevButton = this.page.getByRole("link", { name: "Previous page" });
  }
  //Actions

  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button in pagination`);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button in pagination `);
  };

  //Verify
  expectPreviousButtonIsDisabled = async () => {
    await expect(this.prevButton).toHaveAttribute('disabled');
  }
  expectPreviousButtonIsEnabled = async () => {
    await expect(this.prevButton).not.toHaveAttribute('disabled');
  }
  expectNextButtonIsEnabled = async () => {
    await expect(this.nextButton).not.toHaveAttribute('disabled');
  }
}
