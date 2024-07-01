import BaseComponent from "../base/BaseComponent.js";
export default class BadgeVPN extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.badge = this.page.locator(".badge-vpn")
  }
  
}