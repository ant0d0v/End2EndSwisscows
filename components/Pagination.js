import BaseComponent from "../base/BaseComponent";

export default class Pagination extends BaseComponent {
  constructor(page) {
    super(page);
    this.threeNumberInPagination = this.page.locator("//li[contains(@class, 'number') and .//text()='3']")
    this.secondNumberInPagination = this.page.locator("//li[contains(@class, 'number') and .//text()='2']")
    this.firstNumberInPagination = this.page.locator("//li[contains(@class, 'number') and .//text()='1']")
    this.nextButton = this.page.locator("li.named.next")
    this.prevButton = this.page.locator("li.named.previous")
  }

  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button in pagination`);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button in pagination `);
  };
  clickThreeNumber = async () => {
    await this.clickElement(this.threeNumberInPagination, `three number button in pagination `);
  };
}
