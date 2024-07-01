import { expect, test } from "@playwright/test";
import RequestHolder from "../RequestHolder.js";

export default class SearchResponse extends RequestHolder {
  constructor(request) {
    super(request);
}
  // Verify
  async expectResponseToHaveStatusCode(response, code) {
    await test.step(`Expect status code ${code} `, async () => {
      expect(response.status()).toBe(code);
    });
  }
  async expectBodyToEqual(response, body) {
    await test.step(`Expect status code to be falsy  `, async () => {
      expect(response.json()).resolves.toEqual(expect.objectContaining(body));
    });
  }  
}