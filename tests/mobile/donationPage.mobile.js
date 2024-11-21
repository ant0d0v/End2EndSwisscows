import { test } from "../../utils/fixtures.js";

test.only("Check design of the Donation page ", async ({ app }, testInfo) => {
  //Actions
  await app.donationPage.open();
  //Assert
  await app.donationPage.takeSnapshot(testInfo);
});

test.only("Check design dark theme of the  Donation page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.donationPage.open();
  await app.donationPage.header.clickHamburgerMenuButton();
  await app.donationPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.donationPage.takeSnapshot(testInfo);
});
