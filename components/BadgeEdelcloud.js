import BaseComponent from "../base/BaseComponent.js";


export default class BadgeEdelcloud extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.badge = this.page.locator(".badge-edelcloud")
  }
  
}