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
  expectQuestionsToHaveAttribute = async (expected = { attribute: value }) => {
    await this.expectAttributeClassAllElements(this.qa, expected.attribute);
  };
  async expectQaInfoToContain(
    expectedInfo = {
      question: value,
      answer: value,
    }
  ) {
    await this.expectTextsToContains(this.questions, expectedInfo.question);
    await this.expectTextsToContains(this.answers, expectedInfo.answer);
  }

  takeSnapshotWidgetHeader = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.widgetHeader,
      this.widgetHeader,
      testInfo
    );
  };
  takeSnapshotChevronIconAt = async (
    testInfo,
    expected = { number: value }
  ) => {
    await this.icon.takeSnapshotIconAt(
      testInfo,
      this.chevronIcon,
      expected.number
    );
  };
}
