import { test } from "../../utils/fixtures.js";

test(`Check navigation to corresponding page when cliking keyshift link`, async ({
  app,
  context,
}) => {
  //Actions
  await app.donationPage.open();

  //Assert
  await app.charityPage.expectToBeOpenedPageAfterClickKeyshiftLink(
    "https://keyshift.com/en/donation"
  );
  await app.expectNewPageToHaveTitle(
    context,
    "KeyShift – to transform people and lives."
  );
});

test("Check design of the Donation page ", async ({ app }, testInfo) => {
  //Actions
  await app.donationPage.open();
  //Assert
  await app.donationPage.takeSnapshot(testInfo);
});

test("Check design dark theme of the  Donation page ", async ({
  app,
}, testInfo) => {
  //Actions
  await app.donationPage.open();
  await app.donationPage.header.clickHamburgerMenuButton();
  await app.donationPage.header.hamburgerMenu.selectTheme("Dark");

  //Assert
  await app.donationPage.takeSnapshot(testInfo);
});
