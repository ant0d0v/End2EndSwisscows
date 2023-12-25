const base = require("@playwright/test")
exports.test = base.test.extend({
  page: async ({ page }, use) => {
   
   await page.goto(process.env.WEB_URL);
   page.on("console", (msg) => {
     if (msg.type() === "error") console.log(`Error text: "${msg.text()}"`);
   });
    await use(page);
  },
});
