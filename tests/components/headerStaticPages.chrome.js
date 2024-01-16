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
      headerStaticPages,
      mainPage
    }) => {
      //Actions
      const newPage = await  mainPage.headerStaticPages.clickLinkInStaticHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await headerStaticPages.expectHaveUrl(newPage, expectedLink);
      await headerStaticPages.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});
test("Check charity query counter value at the Beginning", async ({
  mainPage,
}) => {
  //Assert
  await  mainPage.headerStaticPages.searchCounter.expectCharitySearchCounterToHave("0");
});

test("Check charity query counter value after refresh page ", async ({
  mainPage
}) => {
  //Actions
  await mainPage.reloadPage();

  //Assert
  await  mainPage.headerStaticPages.searchCounter.expectCharitySearchCounterToHave("0");
});

test("Check charity query counter value after search and go back to main bage ", async ({
  mainPage,
  webPage,
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(
    testData.searchCriteria.first
  );
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.header.searchCounter.expectCharitySearchCounterToHave("1");
  await webPage.goBack();

  //Assert
  await  mainPage.headerStaticPages.searchCounter.expectCharitySearchCounterToHave("1");
});
test("Check that display of heart icon message in the header static pages", async ({
  headerStaticPages,
}) => {
  //Actions
  await headerStaticPages.searchCounter.clickSearchCounter();

  //Assert
  await headerStaticPages.searchCounter.expectPopupCharitySearchCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test.describe("test use cookie", () => {
  test.use({ storageState: "./data/auth/user.json" });
  test("Check that email icon navigates to account/login page if user logged ", async ({
    mainPage,
    headerStaticPages
  }) => {
    //Actions
    const newPage = await  mainPage.headerStaticPages.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await headerStaticPages.expectHaveUrl(newPage, new RegExp(constantsData.URL_LOGIN_PAGE));
    await headerStaticPages.expectHaveTitle( newPage, constantsData.TITLE_LOGIN_PAGE);
  });
});
test("Clicking on the swisscows's logo on email page leads to the main page.", async ({
  mainPage,
  emailPage,
}) => {
  //Actions
  await emailPage.waitUntilPageIsFullyLoaded();
  await emailPage.headerStaticPages.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, constantsData.URL_MAIN_PAGE);
  await mainPage.expectHaveTitle( mainPage.page, constantsData.TITLE_MAIN_PAGE );
});

test("Clicking on the swisscows's logo on vpn page leads to the main page.", async ({
  mainPage,
  vpnPage,
}) => {
  //Actions
  await vpnPage.waitUntilPageIsFullyLoaded();
  await vpnPage.headerStaticPages.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, constantsData.URL_MAIN_PAGE);
  await mainPage.expectHaveTitle( mainPage.page, constantsData.TITLE_MAIN_PAGE );
});
