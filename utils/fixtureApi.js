const base = require("@playwright/test");
const { BotsProtection } = require("../api/BotsProtection");

exports.test = base.test.extend({
  botsProtection: async ({ request }, use) => {
    await use(new BotsProtection(request));
  },
});

exports.expect = base.expect;
