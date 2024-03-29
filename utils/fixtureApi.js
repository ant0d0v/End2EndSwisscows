const base = require("@playwright/test");
import Builder from "../api/Builder"
import SearchRequest from "../api/SearchRequest"
import SearchResponse from "../api/SearchResponse"

exports.test = base.test.extend({
  searchRequest: async ({ request }, use) => {
    await use(new SearchRequest(request));
  },
  searchResponse: async ({ request }, use) => {
    await use(new SearchResponse(request));
  },
  builder : async ({}, use) => {
    await use(new Builder());
  },
});
exports.expect = base.expect;
