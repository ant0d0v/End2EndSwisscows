import BaseComponent from "../base/BaseComponent.js";


export default class BadgeEmail extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.badge = this.page.locator(".badge-email")
  }
  
}