import { test } from "../../utils/fixtures.js";

test.only("Check design of the Imprint page ", async ({ app }, testInfo) => {
  //Actions
  await app.imprintPage.open();

  //Assert
  await app.imprintPage.takeSnapshot(testInfo);
});

test.only("Check design dark theme of the  Imprint page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.imprintPage.open();
  await app.imprintPage.header.clickHamburgerMenuButton();
  await app.imprintPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.imprintPage.takeSnapshot(testInfo);
});
