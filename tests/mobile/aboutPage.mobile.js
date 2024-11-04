import { test } from "../../utils/fixtures.js";
import { randomUserAgent } from "../../helpers/random.js"

test.use({ userAgent: randomUserAgent() });

test("Check design of the About Page page ", async ({ app }, testInfo) => {
  //Actions
  await app.aboutPage.open();

  //Assert
  await app.aboutPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the   About Page page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.aboutPage.open();
  await app.aboutPage.header.clickHamburgerMenuButton();
  await app.aboutPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.aboutPage.takeSnapshot(testInfo);
});
