const { expect, test } = require("@playwright/test");
import Builder from "./Builder"


export default class SearchRequest {
  constructor(request) {
    this.request = request;
    this.builder = new Builder()
  }
  // Action
  async sendGet(endpoint, searchBuilder) {
     return await test.step(`Send GET request for /music endpoint`, async () => {
      const response = await this.request.get(process.env.API_URL + endpoint, searchBuilder);
      return response;
    });
  }
}
