import { test } from "../../utils/fixtures.js";

test.only("Check design of the Education page ", async ({ app }, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  //Assert
  await app.mediaEducationPage.takeSnapshot(testInfo);
});


test.only("Check design dark theme of the Education page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.mediaEducationPage.open();
  await app.mediaEducationPage.header.clickHamburgerMenuButton();
  await app.mediaEducationPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.mediaEducationPage.takeSnapshot(testInfo);
});
