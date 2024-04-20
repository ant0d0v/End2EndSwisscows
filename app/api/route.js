const { page } = require("@playwright/test");
import PageHolder from "../PageHolder";

const { expect } = require("@playwright/test");

export default class Route extends PageHolder {
  constructor(page) {
    super(page);
  }
  
  //Actions
  mockResponseStatusCode = async (endpoint,code) => {
    await this.page.route(process.env.API_URL + `${endpoint}/*`, async route => {
      await route.fulfill({
        status: code,
      });
    });
  }

}
