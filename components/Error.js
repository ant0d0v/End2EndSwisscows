import BaseComponent from "../base/BaseComponent";
export default class Error extends BaseComponent {
  constructor(page) {
    super(page);

    //Locators
    this.contentErrorNoResultFound = this.page.locator('div').filter({ hasText: 'No results found for' }).nth(1)
  }
}
