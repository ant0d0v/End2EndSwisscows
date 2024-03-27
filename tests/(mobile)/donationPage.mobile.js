import { test } from "../../utils/fixtures";

test("Check design of the Donation page ", async ({ app},testInfo) => {
  //Actions
  await app.donationPage.open()
  //Assert
  await app.donationPage.expectScreenDonationPage(testInfo);
});

test("Check design dark theme of the  Donation page ", async ({
  app
},testInfo) => {
  //Actions
  await app.donationPage.open()
  await app.donationPage.header.clickHamburgerMenuButton();
  await app.donationPage.header.hamburgerMenu.clickThemeDropdown();
  await app.donationPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await app.donationPage.expectScreenDonationPage(testInfo);
});
