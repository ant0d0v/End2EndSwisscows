import BaseComponent from "../base/BaseComponent.js";
export default class FAQ extends BaseComponent {
  constructor(page) {
    super(page);
    //Locators

    this.allAttributeOfQuestions = this.page.locator(".faq");
    this.answersToQuestions = this.page.locator("p.answer");
    this.allQuestions = this.page.locator("h3.question");
    this.linkInTheFourQuestion = this.page.getByRole("link", {
      name: "instructions",
    });
    this.fourQuestion = this.page.getByRole("heading", {
      name: "How can I switch from another",
    });
  }
  //Actions
  clickFourQuestion = async () => {
    await this.clickElement(
      this.fourQuestion,
      `four question in accordion menu`
    );
  };
  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.allQuestions, `questions`);
  };

  // Verify
  expectToBeOpenedPageAfterClickInstructionsLink = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.linkInTheFourQuestion,
      expectedUrl
    );
  };

  expectQuestionsAreOpened = async () => {
    await this.expectElementToHaveClass(this.allAttributeOfQuestions, [
      "faq open",
      "faq open",
      "faq open",
      "faq open",
      "faq open",
      "faq open",
    ]);
  };
  expectQuestionsAreClosed = async () => {
    await this.expectElementToHaveClass(this.allAttributeOfQuestions, [
      "faq",
      "faq",
      "faq",
      "faq",
      "faq",
      "faq",
    ]);
  };
  expectAnswersToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(this.answersToQuestions, expectedText);
  };
  expectListSizeAnswerToQuestions = async (number) => {
    await this.expectListToHaveCount(this.answersToQuestions, number);
  };
}
