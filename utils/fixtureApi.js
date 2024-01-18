const base = require("@playwright/test");
const { BotsProtection } = require("../api/BotsProtection");
const { SearchBuilder } = require("../api/SearchBuilder");

exports.test = base.test.extend({
  botsProtection: async ({ request }, use) => {
    await use(new BotsProtection(request));
  },
  searchBuilder : async ({ request }, use) => {
    await use(new SearchBuilder(request));
  },
});
exports.expect = base.expect;
