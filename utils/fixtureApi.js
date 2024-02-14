const base = require("@playwright/test");
import SearchBuilder from "../api/Search.builder"
import SearchRequest from "../api/Search.request"
import SearchResponse from "../api/Search.response"

exports.test = base.test.extend({
  searchRequest: async ({ request }, use) => {
    await use(new SearchRequest(request));
  },
  searchResponse: async ({ request }, use) => {
    await use(new SearchResponse(request));
  },
  searchBuilder : async ({}, use) => {
    await use(new SearchBuilder());
  },
});
exports.expect = base.expect;
