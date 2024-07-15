import BaseComponent from "../base/BaseComponent.js";
export default class FAQ extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.allAttributeOfQuestions = this.page.locator(".faq");
    this.answersToQuestions = this.page.locator("p.answer");
  }
  //Actions


  // Verify
  expectQuestionsAreOpened = async () => {
    await this.expectAttributeClassAllElements( this.allAttributeOfQuestions, "faq open");
  };
  expectQuestionsAreClosed = async () => {
    await this.expectAttributeClassAllElements( this.allAttributeOfQuestions, "faq" );
  };
  expectListSizeAnswerToQuestions = async (number) => {
    await this.expectListToHaveCount(this.answersToQuestions, number);
  };
}
