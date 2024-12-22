import BasePage from "../../../../base/BasePage.js";
import Form from "./Form.js";
import  { expect } from "@playwright/test"

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.form = new Form(this.page)

    //Locators
    this.root = this.page.locator(".login")
    this.image = this.root.locator(".content img")
  }
  //Actions

  //Verify
  async waitImageIsLoaded(){
    await this.waitElementIsLoaded(this.image, "Main image")
  }
}
