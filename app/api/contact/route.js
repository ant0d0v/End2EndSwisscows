import PageHolder from "../../../base/PageHolder.js";
export default class ContactRoute extends PageHolder {
  constructor(page) {
    super(page);
  }
  
  //Actions
  requestWithGivenResponseStatusCode = async (code) => {
    await this.page.route(process.env.BASE_URL + `/api/contact`, async route => {
      await route.fulfill({
        status: code,
        contentType: "application/json",
        body: JSON.stringify({ message: "Error" }),
      });
    });
  }
}
