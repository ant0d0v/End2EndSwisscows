import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";

export default class FAQ extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(this.page);
    //Locators
    this.root = this.page.locator(".widget.widget-faq");
    this.widgetHeader = this.root.locator(".widget-header");
    this.widgetTitle = this.root.locator(".widget-title");
    this.qa = this.root.locator(".qa");
    this.chevronIcon = this.qa.locator(".chevron.icon");
    this.answers = this.qa.locator(".answer");
    this.questions = this.qa.locator(".question");
  }
  //Actions

  clickAllQuestions = async () => {
    await this.clickAllElementsInList(this.questions, `questions`);
  };

  waitUntilWidgetToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.widgetTitle);
  };

  // Verify
  expectQuestionsToHaveAttribute = async (expected = { attribute: String }) => {
    await this.expectAttributeClassAllElements(this.qa, expected.attribute);
  };
  async expectQaInfoToContain(
    expectedInfo = {
      question: String,
      answer: String,
    }
  ) {
    await this.expectTextsToContains(this.questions, expectedInfo.question);
    await this.expectTextsToContains(this.answers, expectedInfo.answer);
  }

  takeSnapshot = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.root.first(),
      this.root.first(),
      testInfo
    );
  };
  
  takeSnapshotChevronIconAt = async (
    testInfo,
    expected = { number: Number }
  ) => {
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.chevronIcon,
      expected.number
    );
  };
}
