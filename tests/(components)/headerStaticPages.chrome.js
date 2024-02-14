import { test } from "../../utils/fixturePages";
const data = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const testData = JSON.parse(
  JSON.stringify(require("../../data/header/testData.json"))
);
const constantsData = JSON.parse(
  JSON.stringify(require("../../data/project-constants/testData.json"))
);

test.describe("test don't use cookie ", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID,expectedLink,locatorId,expectedTitle,} of data.headerLinks) {
    test(`${testID} Check that header static badge ${locatorId} link navigate to corresponding pages`, async ({
      home
    }) => {
      //Actions
      const newPage = await  home.header.clickLinkInStaticHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await home.header.expectHaveUrl(newPage, expectedLink);
      await home.header.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});
test("Check charity query counter value at the Beginning", async ({
  home,
}) => {
  //Assert
  await  home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after refresh page ", async ({
  home
}) => {
  //Actions
  await home.reloadPage();

  //Assert
  await home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
  home,
  webPage,
}) => {
  //Actions
  await home.header.searchForm.inputSearchCriteria(
    testData.searchCriteria.first
  );
  await home.header.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.goBack();

  //Assert
  await  home.header.badgeCounter.expectCharityBadgeCounterToHaveValue("1");
});
test("Check that display of heart icon message in the header static pages", async ({ 
  home
}) => {
  //Actions
  await home.header.badgeCounter.clickBadgeCounter();

  //Assert
  await home.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test.describe("test use cookie", () => {
  test.use({ storageState: "./data/auth/user.json" });
  test("Check that email icon navigates to account/login page if user logged ", async ({
    home,
  }) => {
    //Actions
    const newPage = await home.header.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await home.header.expectHaveUrl(newPage, new RegExp(constantsData.URL_LOGIN_PAGE));
    await home.header.expectHaveTitle( newPage, constantsData.TITLE_LOGIN_PAGE);
  });
});
test("Clicking on the swisscows's logo on email page leads to the home page.", async ({
  home,
  emailPage,
}) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  await emailPage.header.clickSwisscowsEmailLogo();

  //Assert
  await home.expectHaveUrl(home.page, constantsData.URL_MAIN_PAGE);
  await home.expectHaveTitle( home.page, constantsData.TITLE_MAIN_PAGE );
});

test("Clicking on the swisscows's logo on vpn page leads to the home page.", async ({
  home,
  vpnPage,
}) => {
  //Actions
  await vpnPage.waitUntilPageIsFullyLoaded();
  await vpnPage.header.clickSwisscowsVpnLogo();

  //Assert
  await home.expectHaveUrl(home.page, constantsData.URL_MAIN_PAGE);
  await home.expectHaveTitle( home.page, constantsData.TITLE_MAIN_PAGE );
});
