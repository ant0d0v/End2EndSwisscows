import { test } from "../../utils/fixturePages";

test("Check design of the Donation page ", async ({ donationPage },testInfo) => {
  //Assert
  await donationPage.expectScreenDonationPage(testInfo);
});

test("Check design dark theme of the  Donation page ", async ({
  donationPage
},testInfo) => {
  //Actions
  await donationPage.waitUntilPageIsFullyLoaded();
  await donationPage.header.clickHamburgerMenuButton();
  await donationPage.header.hamburgerMenu.clickThemeDropdown();
  await donationPage.header.hamburgerMenu.clickDarkTheme();

  //Assert
  await donationPage.expectScreenDonationPage(testInfo);
});
