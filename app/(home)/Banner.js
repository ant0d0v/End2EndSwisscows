import BaseComponent from "../../base/BaseComponent.js";

export default class Extension extends BaseComponent {
  constructor(page) {
    super(page);
    // Locators
    this.widget = this.page.locator(".bnnr-widget");
  }

}
