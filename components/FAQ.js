import BaseComponent from "../base/BaseComponent.js";
import Translations from "../i18n/index.js";
export default class FAQ extends BaseComponent {
  constructor(page) {
    super(page);
    this.translations = Translations;
    //Locators
    this.root = this.page.locator(".faq-wrap");
    this.faq = this.page.locator(".faq");
    this.answers = this.page.locator("p.answer");
    this.questions = this.root.locator("h3.question");
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
    await this.clickAllElementsInList(this.questions, `questions`);
  };

  // Verify
  expectToBeOpenedPageAfterClickInstructionsLink = async (expectedUrl) => {
    await this.expectToBeOpenedNewPageAfterClick(
      this.linkInTheFourQuestion,
      expectedUrl
    );
  };

  expectQuestionsAreOpened = async () => {
    await this.expectElementToHaveClass(this.faq, [
      "faq open",
      "faq open",
      "faq open",
      "faq open",
      "faq open",
      "faq open",
    ]);
  };
  expectQuestionsAreClosed = async () => {
    await this.expectElementToHaveClass(this.faq, [
      "faq",
      "faq",
      "faq",
      "faq",
      "faq",
      "faq",
    ]);
  };
  expectAnswersToHaveText = async (expectedText) => {
    await this.expectElementToHaveText(this.answers, expectedText);
  };
  expectListSizeAnswerToQuestions = async (number) => {
    await this.expectListToHaveCount(this.answers, number);
  };

  //Locales
  async expectTranslationsForQuestions(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      locale: value,
    }
  ) {
    const expectedTextFAQ_Question_1 = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Question_2 = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Question_3 = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Question_4 = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Question_5 = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Question_6 = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.questions, [
      expectedTextFAQ_Question_1,
      expectedTextFAQ_Question_2,
      expectedTextFAQ_Question_3,
      expectedTextFAQ_Question_4,
      expectedTextFAQ_Question_5,
      expectedTextFAQ_Question_6,
    ]);
  }

  async expectTranslationsForAnswers(
    expected = {
      translationKey_1: value,
      translationKey_2: value,
      translationKey_3: value,
      translationKey_4: value,
      translationKey_5: value,
      translationKey_6: value,
      locale: value,
    }
  ) {
    const expectedTextFAQ_Answer_1 = this.translations.t(
      expected.translationKey_1,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Answer_2 = this.translations.t(
      expected.translationKey_2,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Answer_3 = this.translations.t(
      expected.translationKey_3,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Answer_4 = this.translations.t(
      expected.translationKey_4,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Answer_5 = this.translations.t(
      expected.translationKey_5,
      {
        lng: expected.locale,
      }
    );
    const expectedTextFAQ_Answer_6 = this.translations.t(
      expected.translationKey_6,
      {
        lng: expected.locale,
      }
    );
    await this.expectElementToHaveText(this.answers, [
      expectedTextFAQ_Answer_1,
      expectedTextFAQ_Answer_2,
      expectedTextFAQ_Answer_3,
      expectedTextFAQ_Answer_4,
      expectedTextFAQ_Answer_5,
      expectedTextFAQ_Answer_6,
    ]);
  }
}
