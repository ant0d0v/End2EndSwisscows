import { test } from "../../utils/fixtures.js";

test("Check design of the default search page ", async ({ app }, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  //Assert
  await app.defaultSearchPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the default search page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.defaultSearchPage.open();
  await app.defaultSearchPage.header.clickHamburgerMenuButton();
  await app.defaultSearchPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.defaultSearchPage.takeSnapshot(testInfo);
});
