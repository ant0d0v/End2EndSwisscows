import PageHolder from "../../base/PageHolder.js";
export default class Route extends PageHolder {
  constructor(page) {
    super(page);
  }

  //Actions
  requestWithGivenResponseStatusCode = async (endpoint, code) => {
    await this.page.route(
      process.env.API_URL + `${endpoint}/*`,
      async (route) => {
        await route.fulfill({
          status: code,
        });
      }
    );
  };
  
  requestWithGivenResponse = async (endpoint, body) => {
    await this.page.route(process.env.API_URL + `${endpoint}/**`, (route) =>
      route.fulfill({
        contentType: "application/json",
        path: body,
      })
    );
  };

  requestWithGivenResponseTypeText = async (endpoint, body) => {
    await this.page.route(process.env.API_URL + `${endpoint}**`, (route) =>
      route.fulfill({
        contentType: "text/plain; charset=utf-8",
        path: body,
      })
    );
  };

  mockResponseMusicBody = async (endpoint, body) => {
    await this.page.route(process.env.API_URL + `${endpoint}**`, (route) =>
      route.fulfill({
        contentType: "application/json",
        path: body,
      })
    );
  };
}
