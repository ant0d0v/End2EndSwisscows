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
  async expectResponseToBeOk(response) {
    await test.step(`Response has an OK status `, async () => {
      await expect(response).toBeOK();
    });
  }
  async expectBodyToEqual(response, body) {
    await test.step(`Expect status code to be falsy  `, async () => {
      expect(response.json()).resolves.toEqual(expect.objectContaining(body));
    });
  }
  async expectBodyNotToBeNull(response) {
    await test.step(`Expect status code to be falsy  `, async () => {
      expect(response.json()).not.toBeNull()
    });
  }
}