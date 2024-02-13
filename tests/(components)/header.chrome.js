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

test("Clicking on the swisscows's logo leads to the home page.", async ({
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickSwisscowsLogo();

  //Assert
  await home.expectHaveUrl(home.page, constantsData.URL_MAIN_PAGE);
  await home.expectHaveTitle( home.page, constantsData.TITLE_MAIN_PAGE );
});

test("Check query counter value when searching for images ", async ({
  header,
  home,
  imagePage,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await header.clickImageSearchButton();

  //Assert
  await imagePage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
});

test("Check query counter value when searching for video ", async ({
  videoPage,
  header,
  webPage,
  home
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await header.clickVideoSearchButton();

  //Assert
  await videoPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
});

test("Check query counter value when searching for music", async ({
    home,
    header,
    webPage,
    musicPage
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
    await header.clickMusicSearchButton();

    //Assert
    await musicPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
  });


test("Check query counter value when searching for news", async ({
  home,
  header,
  newsPage,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.header.clickHamburgerMenuButton();
  await webPage.header.hamburgerMenu.selectRegion("Germany");
  await webPage.item.expectWebItemsToBeVisible()
  await header.clickNewsSearchButton();

  //Assert
  await newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("3");
});

test("Check query counter value when searching for shopping", async ({
  header,
  shoppingPage,
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.clickHamburgerMenuButton();
  await home.headerStaticPages.hamburgerMenu.selectRegion("Germany");
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await header.clickShoppingSearchButton();

  //Assert
  await shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue("2");
});

  test("Check that email icon navigates to account/login page if user logged ", async({
    header,
    home,
    webPage, 
  }) => {
    //Actions
    await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
    await home.headerStaticPages.searchForm.clickEnterSearchField();
    await webPage.item.expectWebItemsToBeVisible()
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
      home,
      webPage,
    }) => {
      //Actions
      await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
      await home.headerStaticPages.searchForm.clickEnterSearchField();
      await webPage.item.expectWebItemsToBeVisible()
      const newPage = await header.clickLinkInHeaderAndNavigateToNewPage(locatorId);

      //Assert
      await header.expectHaveUrl(newPage, expectedLink);
      await header.expectHaveTitle(newPage, new RegExp(expectedTitle));
    });
  }
});

test("Check that display of heart icon message in the header", async ({
  header,
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.third);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.header.badgeCounter.clickBadgeCounter();

  //Assert
  await header.badgeCounter.expectPopupCharityBadgeCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test("Check suggest on the web search", async ({
  home,
  webPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.header.searchForm.clickSearchField()

  //Assert
  await webPage.header.searchForm.expectSuggestIsDisplayed();
  await webPage.header.searchForm.expectSuggestToHaveCount(5);
  await webPage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});

test("Check suggest on the image search", async ({
  home,
  webPage,
  imagePage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickImageSearchButton()
  await imagePage.item.expectImageItemsToBeVisible()
  await imagePage.header.searchForm.clickSearchField()
 
  //Assert
  await imagePage.header.searchForm.expectSuggestIsDisplayed();
  await imagePage.header.searchForm.expectSuggestToHaveCount(5);
  await imagePage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});

test("Check suggest on the video search", async ({
  home,
  webPage,
  videoPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickVideoSearchButton()
  await videoPage.item.expectVideoItemsToBeVisible()
  await videoPage.header.searchForm.clickSearchField()
 
  //Assert
  await videoPage.header.searchForm.expectSuggestIsDisplayed();
  await videoPage.header.searchForm.expectSuggestToHaveCount(5);
  await videoPage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});

test("Check suggest on the news search", async ({
  home,
  webPage,
  newsPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.header.clickHamburgerMenuButton();
  await webPage.header.hamburgerMenu.selectRegion("Germany");
  await webPage.header.clickNewsSearchButton()
  await newsPage.item.expectNewsItemsToBeVisible()
  await newsPage.header.searchForm.clickSearchField()
 
  //Assert
  await newsPage.header.searchForm.expectSuggestIsDisplayed();
  await newsPage.header.searchForm.expectSuggestToHaveCount(5);
  await newsPage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});

test("Check suggest on the shopping search", async ({
  home,
  webPage,
  shoppingPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.item.expectWebItemsToBeVisible()
  await webPage.header.clickHamburgerMenuButton();
  await webPage.header.hamburgerMenu.selectRegion("Germany");
  await webPage.header.clickShoppingSearchButton()
  await shoppingPage.item.expectShoppingItemsToBeVisible()
  await shoppingPage.header.searchForm.clickSearchField()
 
  //Assert
  await shoppingPage.header.searchForm.expectSuggestIsDisplayed();
  await shoppingPage.header.searchForm.expectSuggestToHaveCount(5);
  await shoppingPage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});

test("Check suggest on the music search", async ({
  home,
  webPage,
  musicPage
}) => {
  //Actions
  await home.headerStaticPages.searchForm.inputSearchCriteria(testData.searchCriteria.first);
  await home.headerStaticPages.searchForm.clickEnterSearchField();
  await webPage.header.clickMusicSearchButton()
  await musicPage.track.expectMusicItemsToBeVisible()
  await musicPage.header.searchForm.clickSearchField()
 
  //Assert
  await musicPage.header.searchForm.expectSuggestIsDisplayed();
  await musicPage.header.searchForm.expectSuggestToHaveCount(5);
  await musicPage.header.searchForm.expectSuggestToContains(testData.searchCriteria.first);
});


