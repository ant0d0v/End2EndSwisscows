import { test } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/donation-page/testData.json"))
);

test("Check design of the Donation page ", async ({ donationPage }) => {
  //Assert
  await donationPage.expectScreenDonationPage();
});

test("Check design dark theme of the  Donation page ", async ({
  donationPage
}) => {
  //Actions
  await donationPage.waitUntilPageIsFullyLoaded();
  await donationPage.headerStaticPages.clickHamburgerMenuButton();
  await donationPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await donationPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await donationPage.expectScreenDonationPage();
});
