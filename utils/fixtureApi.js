const base = require("@playwright/test");
import SearchBuilder from "../api/search/Builder"
import SearchRequest from "../api/search/Request"
import SearchResponse from "../api/search/Response"

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
