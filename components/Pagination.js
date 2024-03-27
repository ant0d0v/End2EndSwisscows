import BaseComponent from "../base/BaseComponent";

export default class Pagination extends BaseComponent {
  constructor(page) {
    super(page);
    this.threeNumber = this.page.locator("//li[contains(@class, 'number') and .//text()='3']")
    this.secondNumber = this.page.locator("//li[contains(@class, 'number') and .//text()='2']")
    this.firstNumber = this.page.locator("//li[contains(@class, 'number') and .//text()='1']")
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
    await this.clickElement(this.threeNumber, `three number button in pagination `);
  };

  //Verify
  expectFirstNumberIsActive = async () => {
    await this.expectAttributeClassOfElement(this.firstNumber, "number active");
  }
  expectSecondNumberIsActive = async () => {
    await this.expectAttributeClassOfElement(this.secondNumber, "number active");
  }
  expectThreeNumberIsActive = async () => {
    await this.expectAttributeClassOfElement(this.threeNumber, "number active");
  }
}
