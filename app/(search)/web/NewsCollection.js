import BaseComponent from "../../../base/BaseComponent.js";
import Icon from "../../../components/Icon.js";


export default class NewsCollection extends BaseComponent {
  constructor(page) {
    super(page);
    this.icon = new Icon(this.page);

    //Locators
    this.root = this.page.locator(".widget.widget-news");
    this.widgetHeader = this.root.locator(".widget-header");
    this.widgetTitle = this.root.locator(".widget-title");
    this.titles = this.root.locator(".title");
    this.date = this.root.locator(".date");
    this.descriptions = this.root.locator(".description");
    this.nextButton = this.root.locator(".widget-buttons button.next");
    this.prevButton = this.root.locator(".widget-buttons button.prev");;
    this.slides = this.root.locator(".swiper-slide");
  }
  //Actions
  clickNextButton = async () => {
    await this.clickElement(this.nextButton, `next button`);
  };
  clickPrevButton = async () => {
    await this.clickElement(this.prevButton, `prev button`);
  };

  waitUntilWidgetToBeVisible = async () => {
    await this.waitUntilElementToBeVisible(this.widgetTitle);
  };

  navigateToNewPageWhenClickingTitleAt = async (
    expected = { number: index }
  ) => {
    return await this.clickElementAndNavigateToNewPage(
      this.titles.nth(expected.number - 1),
      `${expected.number} index of title`
    );
  };

  //Verify
  async expectToHaveAttributeSlideAt(
    expected = { number: index, attribute: value }
  ) {
    await this.expectAttributeClassOfElement(
      this.slides.nth(expected.number - 1),
      expected.attribute
    );
  }
 
  async expectArticleInfoToContain(
    expectedInfo = {
      title: value,
      date: value
    }
  ) {
    await this.expectTextsToContains(this.titles, expectedInfo.title);
    await this.expectTextsToContains(this.date, expectedInfo.date);
  }
  expectArticleDescriptionNotToBeEmpty = async () => {
    await this.expectListElementsNotToBeEmpty(this.descriptions);
  };

  takeSnapshotWidgetHeader = async (testInfo) => {
    await this.expectPageElementToHaveScreenshot(
      this.widgetHeader,
      this.widgetHeader,
      testInfo
    );
  };
}
