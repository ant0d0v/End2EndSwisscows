
const base = require('@playwright/test');

import Application from "../app/index.js";
exports.test = base.test.extend({
  app: async ({page}, use) => {
    await use(new Application(page));
  },
});

exports.expect = base.expect;
