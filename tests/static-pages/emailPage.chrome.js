import { test, expect } from "../../utils/fixturePages";
const testData = JSON.parse(
  JSON.stringify(require("../../data/static-pages/email-page/testData.json"))
);


test("Check design of the Email page ", async ({ emailPage },testInfo) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  //Assert
  await emailPage.expectScreenEmailPage(testInfo)
});

test("Check design dark theme of the  Email page ", async ({
  emailPage
},testInfo) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  await emailPage.headerStaticPages.clickHamburgerMenuButton();
  await emailPage.headerStaticPages.hamburgerMenu.clickThemeDropdownInHamburgerMenu();
  await emailPage.headerStaticPages.hamburgerMenu.clickDarkInHamburgerMenu();

  //Assert
  await emailPage.expectScreenEmailPage(testInfo)
});

for (const { testID, expectedLink, locatorId, expectedTitle,} of testData.introductionAndSupportLinks) {
  test(`${testID} Check navigation to corresponding pages for  '${locatorId}' link`, async ({
    emailPage
  }) => {
    //Actions
    const newPage = await emailPage.clickIntroductionAndSupportLinksAndNavigateToNewPage(locatorId);

    //Assert
    await emailPage.expectHaveUrl(newPage , new RegExp(expectedLink));
    await emailPage.expectHaveTitle(newPage ,expectedTitle);
  });
}

for (const { testID, expectedLink, locatorId, buttonName, expectedTitle,} of testData.subscriptionLinks) {
  test(`${testID} Check navigation to corresponding pages for ${buttonName} link`, async ({
    emailPage
  }) => {
    //Actions
    const newPage = await emailPage.clickSubscriptionLinksAndNavigateToNewPage(locatorId,buttonName);

    //Assert
    await emailPage.expectHaveUrl(newPage , new RegExp(expectedLink));
    await emailPage.expectHaveTitle(newPage ,expectedTitle);
  });
}

test("Check that buttons have hover effect on email page", async ({ emailPage }) => {

  // Assert
  await emailPage.expectColorsLinksWhenHovering(emailPage.introductionAndSupportButtons, "background", 
  "rgb(191, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box");
});
