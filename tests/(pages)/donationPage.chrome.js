import { test, expect } from "../../utils/fixtures";
const testData = JSON.parse(
  JSON.stringify(require("../../data/pages/donation/testData.json"))
);
test.use({ headless: false });

for (const { testID, pdfLink, locatorId } of testData.donationPdfLinks) {
  test(`${testID} Check navigation to corresponding page for  ${locatorId} pdf link and validate pdf`, async ({
   app
  },testInfo) => {
    //Actions
    await app.donationPage.open()
    const currentPage = await app.donationPage.clickPdfLinkOnThePage(locatorId);
    
    //Assert
    await app.donationPage.expectHaveUrl(currentPage, pdfLink);
    await app.donationPage.expectValidatePdfFile(currentPage, pdfLink,testInfo);
  });
}
for (const { testID, expectedLink, locatorId, expectedTitle, } of testData.donationLinks) {
  test(`${testID} Check navigation to corresponding pages for  ${locatorId} link`, async ({
    app
  }) => {
    //Actions
    await app.donationPage.open()
    const currentPage = await app.donationPage.clickLinkOnThePage(locatorId);

    //Assert
    await app.donationPage.expectHaveUrl(currentPage, expectedLink);
    await app.donationPage.expectHaveTitle(currentPage, expectedTitle);
  });
}

test("Check design of the Donation page ", async ({ app },testInfo) => {
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
