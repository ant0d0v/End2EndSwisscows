const { test, expect } = require("../../utils/fixturePages");
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/donation-page/testData.json"))
);

for (const { testID, pdfLink, locatorId } of testData.donationPdfLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} pdf link and validate pdf`, async ({
   donationPage,
  }) => {
    //Actions
    const currentPage = await donationPage.clickPdfLinkOnThePage(locatorId);
    
    //Assert
    await donationPage.expectHaveUrl(currentPage, pdfLink);
    await donationPage.expectValidatePdfFile(currentPage, pdfLink);
  });
}
for (const { testID, expectedLink, locatorId, expectedTitle, } of testData.donationLinks) {
  test(`${testID} Check navigation to corresponding pages for  ${locatorId} link`, async ({
    donationPage
  }) => {
    //Actions
    const currentPage = await donationPage.clickLinkOnThePage(locatorId);

    //Assert
    await donationPage.expectHaveUrl(currentPage, expectedLink);
    await donationPage.expectHaveTitle(currentPage, expectedTitle);
  });
}

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
