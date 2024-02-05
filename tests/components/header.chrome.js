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

test("Clicking on the swisscows's logo leads to the main page.", async ({
  mainPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.first);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.header.clickSwisscowsLogo();

  //Assert
  await mainPage.expectHaveUrl(mainPage.page, constantsData.URL_MAIN_PAGE);
  await mainPage.expectHaveTitle( mainPage.page, constantsData.TITLE_MAIN_PAGE );
});

test("Check query counter value when searching for images ", async ({
  header,
  mainPage,
  imagePage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.expectWebItemsToBeVisible()
  await header.clickImageSearchButton();

  //Assert
  await imagePage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText("2");
});

test("Check query counter value when searching for video ", async ({
  videoPage,
  header,
  webPage,
  mainPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.expectWebItemsToBeVisible()
  await header.clickVideoSearchButton();

  //Assert
  await videoPage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText("2");
});

test("Check query counter value when searching for music", async ({
    mainPage,
    header,
    webPage,
    musicPage
  }) => {
    //Actions
    await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
    await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
    await webPage.expectWebItemsToBeVisible()
    await header.clickMusicSearchButton();

    //Assert
    await musicPage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText("2");
  });


test("Check query counter value when searching for news", async ({
  mainPage,
  header,
  newsPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.expectWebItemsToBeVisible()
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.selectGermanyRegion();
  await webPage.expectWebItemsToBeVisible()
  await header.clickNewsSearchButton();

  //Assert
  await newsPage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText("3");
});

test("Check query counter value when searching for shopping", async ({
  header,
  shoppingPage,
  mainPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.clickHamburgerMenuButton();
  await mainPage.headerStaticPages.hamburgerMenu.selectGermanyRegion();
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.expectWebItemsToBeVisible()
  await header.clickShoppingSearchButton();

  //Assert
  await shoppingPage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText("2");
});

  test("Check that email icon navigates to account/login page if user logged ", async({
    header,
    mainPage,
    webPage, 
  }) => {
    //Actions
    await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
    await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
    await webPage.expectWebItemsToBeVisible()
    const newPage = await header.clickBadgeEmailAndNavigateToNewPage();

    //Assert
    await header.expectHaveUrl( newPage, new RegExp( constantsData.URL_LOGIN_PAGE));
    await header.expectHaveTitle(newPage, constantsData.TITLE_LOGIN_PAGE);
  });

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  for (const { testID, expectedLink, locatorId, expectedTitle, } of data.headerLinks) {
    test(`${testID} Check that header badge ${locatorId} link navigate to corresponding pages`, async ({
      header,
      mainPage,
      webPage,
    }) => {
      //Actions
      await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
      await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
      await webPage.expectWebItemsToBeVisible()
      const newPage = await header.clickLinkInHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await header.expectHaveUrl(newPage, expectedLink);
      await header.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});

test("Check that display of heart icon message in the header", async ({
  header,
  mainPage,
  webPage
}) => {
  //Actions
  await mainPage.headerStaticPages.autocomplete.inputSearchCriteria(testData.searchCriteria.third);
  await mainPage.headerStaticPages.autocomplete.clickEnterSearchField();
  await webPage.expectWebItemsToBeVisible()
  await webPage.header.badgeCounter.clickBadgeCounter();

  //Assert
  await header.badgeCounter.expectPopupCharityBadgeCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});
