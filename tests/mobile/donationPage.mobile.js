const { test, expect } = require("../../utils/fixturePages");
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/donation-page/testData.json"))
);

test("Check design of the Donation page ", async ({ donationPage }) => {
  //Assert
  await donationPage.expectScreenDonationPage();
});

test("Check design dark theme of the  Donation page ", async ({
  donationPage,
  headerStaticPages,
  hamburgerMenu,
}) => {
  //Actions
  await donationPage.waitUntilPageIsFullyLoaded();
  await headerStaticPages.clickHamburgerMenuButton();
  await hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await donationPage.expectScreenDonationPage();
});
