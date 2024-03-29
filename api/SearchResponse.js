const { expect, test } = require("@playwright/test");

export default class SearchResponse {
  constructor(request) {
    this.request = request;
  }
  // Verify
 async expectResponseToHaveStatusCode(response, code) {
    await test.step(`Expect status code ${code} `, async () => {
      expect(response.status()).toBe(code);
    });
  }

  async expectResponseToBeFalsy(response) {
    await test.step(`Expect status code to be falsy  `, async () => {
      expect(response.ok()).toBeFalsy();
    });
  }
}