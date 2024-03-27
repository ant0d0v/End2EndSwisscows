const { page } = require("@playwright/test");

const { expect } = require("@playwright/test");

export default class Route {
  constructor(page) {
    this.page = page;
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
