import { expect, test } from "@playwright/test";
// Base and utility imports
import PageHolder from "../base/PageHolder.js";
import LoginPage from "./login/page.js";

export default class AccountsApplication extends PageHolder {
  constructor(page) {
    super(page)
    this.loginPage = new LoginPage(this.page)
  
  }
  //Actions
  async open() {
    await this.page.goto("https://admin.dev.swisscows.com");
  }

  //Verify
}
