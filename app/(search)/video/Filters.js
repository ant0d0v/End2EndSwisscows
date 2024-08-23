import BaseComponent from "../../../base/BaseComponent.js";
import SelectMenu from "../../../components/Select.js";

export default class Filters extends BaseComponent {
  constructor(page) {
    super(page);
    this.selectMenu = new SelectMenu(page);

    //Locators
    this.filterBy = (name) => this.page.locator('button').filter({ hasText: name })
    this.filterAllPublisher = this.page.locator(".filter-bar button").first();
  }

  //Actions
  clickFilterBy = async (name) => {
    await this.clickElement(this.filterBy(name), `filter by ${name} in dropdown`);
  };

  clickOnPage = async () => {
    await this.clickElement(this.page.locator('html'), `click on page`);
  };

  //Verify
  expectFilterAllPublisherIs = async (value ) => {
    await this.expectAttributeToHaveValue(
      this.filterAllPublisher,
      "data-state",
      value
    );
  };
}
