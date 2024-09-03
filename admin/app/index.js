import { expect, test } from "@playwright/test";
// Base and utility imports
import PageHolder from "../../base/PageHolder.js";
import Api from "../../api/api.js";

export default class Application extends PageHolder {
  //Actions
  async open() {
    await this.page.goto("https://admin.dev.swisscows.com");
  }

  //Verify
}
