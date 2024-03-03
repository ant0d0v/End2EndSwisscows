import BaseComponent from "../base/BaseComponent";
const { expect } = require("@playwright/test");

export default class BadgeVPN extends BaseComponent {
  constructor(page) {
    super(page);
    
    //Locators
    this.badge = this.page.locator(".badge-vpn")
  }
  
}