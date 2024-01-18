const base = require("@playwright/test");
import BotsProtection from "../api/BotsProtection"
import SearchBuilder from "../api/Search.Builder"
import SearchRequest from "../api/Search.request"
import SearchResponse from "../api/Search.response"

exports.test = base.test.extend({
  botsProtection: async ({ request }, use) => {
    await use(new BotsProtection(request));
  },
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
