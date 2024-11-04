import { test } from "../../utils/fixtures.js";
import { randomUserAgent } from "../../helpers/random.js"

test.use({ userAgent: randomUserAgent() });

test("Check design of the Education page ", async ({ app }, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  //Assert
  await app.mediaEducationPage.takeSnapshot(testInfo);
});


test("Check design dark theme of the Education page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  await app.mediaEducationPage.header.clickHamburgerMenuButton();
  await app.mediaEducationPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.mediaEducationPage.takeSnapshot(testInfo);
});
