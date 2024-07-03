import { test } from "../../utils/fixtures.js";
import constantsData from "../../data/project-constants/testData.json"

test("Clicking on the swisscows's logo leads to the home page.", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("test123");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickSwisscowsLogo();

  //Assert
  await app.expectHaveUrl(app.page, constantsData.URL_MAIN_PAGE);
  await app.expectHaveTitle(app.page, constantsData.TITLE_MAIN_PAGE);
});

test("Check query counter value when searching for images ", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ukraine");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.imagePage.header.clickImageSearchButton();

  //Assert
  await app.imagePage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for video ", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("forever");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.videoPage.header.clickVideoSearchButton();

  //Assert
  await app.videoPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for music", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("news");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.musicPage.header.clickMusicSearchButton();

  //Assert
  await app.musicPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test("Check query counter value when searching for news", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("best");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.newsPage.header.clickNewsSearchButton();

  //Assert
  await app.newsPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "3"
  );
});

test("Check query counter value when searching for shopping", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.clickHamburgerMenuButton();
  await app.home.header.hamburgerMenu.selectRegion("Germany");
  await app.home.header.searchForm.inputSearchCriteria("iphone + apple");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.shoppingPage.header.clickShoppingSearchButton();

  //Assert
  await app.shoppingPage.header.badgeCounter.expectCharityBadgeCounterToHaveValue(
    "2"
  );
});

test.describe("test use cookie", () => {
  test("Check that email badge navigates to account/login page if user logged ", async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("laptop");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeEmail.badge,
      constantsData.URL_LOGIN_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_LOGIN_PAGE);
  });
});

test.describe("tests don't use cookie", () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test(`Check that email badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("best");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeEmail.badge,
      constantsData.URL_EMAIL_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_EMAIL_PAGE);
  });

  test(`Check that Teleguard badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("best");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeTeleguard.badge,
      constantsData.URL_TELEGUARD_PAGE
    );

    await app.expectNewPageToHaveTitle(
      context,
      constantsData.TITLE_TELEGUARD_PAGE
    );
  });

  test(`Check that vpn badge link navigate to corresponding pages`, async ({
    app,
    context,
  }) => {
    //Actions
    await app.home.open();
    await app.home.header.searchForm.inputSearchCriteria("best");
    await app.home.header.searchForm.clickEnterSearchField();
    await app.webPage.item.expectWebItemsToBeVisible();

    //Assert
    await app.webPage.header.expectToBeOpenedNewPageAfterClick(
      app.webPage.header.badgeVPN.badge,
      constantsData.URL_VPN_PAGE
    );

    await app.expectNewPageToHaveTitle(context, constantsData.TITLE_VPN_PAGE);
  });
});

test("Check that display of heart icon message in the header", async ({
  app,
}) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("football");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.badgeCounter.clickBadgeCounter();

  //Assert
  await app.webPage.header.badgeCounter.expectPopupCharityBadgeCounterToHaveText(
    "Charity ProjectThis is the number of your Swisscows searches. On average, 50 search queries finance a children's meal. Register and receive newsletters."
  );
});

test("Check suggest on the web search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.searchForm.clickSearchField();

  //Assert
  await app.webPage.header.searchForm.expectSuggestIsDisplayed();
  await app.webPage.header.searchForm.expectSuggestToHaveCount(5);
  await app.webPage.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check suggest on the image search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickImageSearchButton();
  await app.imagePage.item.expectImageItemsToBeVisible();
  await app.imagePage.header.searchForm.clickSearchField();

  //Assert
  await app.imagePage.header.searchForm.expectSuggestIsDisplayed();
  await app.imagePage.header.searchForm.expectSuggestToHaveCount(5);
  await app.imagePage.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check suggest on the video search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickVideoSearchButton();
  await app.videoPage.item.expectVideoItemsToBeVisible();
  await app.videoPage.header.searchForm.clickSearchField();

  //Assert
  await app.videoPage.header.searchForm.expectSuggestIsDisplayed();
  await app.videoPage.header.searchForm.expectSuggestToHaveCount(5);
  await app.videoPage.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check suggest on the news search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickNewsSearchButton();
  await app.newsPage.item.expectNewsItemsToBeVisible();
  await app.newsPage.header.searchForm.clickSearchField();

  //Assert
  await app.newsPage.header.searchForm.expectSuggestIsDisplayed();
  await app.newsPage.header.searchForm.expectSuggestToHaveCount(5);
  await app.newsPage.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check suggest on the shopping search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.item.expectWebItemsToBeVisible();
  await app.webPage.header.clickHamburgerMenuButton();
  await app.webPage.header.hamburgerMenu.selectRegion("Germany");
  await app.webPage.header.clickShoppingSearchButton();
  await app.shoppingPage.item.expectShoppingItemsToBeVisible();
  await app.shoppingPage.header.searchForm.clickSearchField();

  //Assert
  await app.shoppingPage.header.searchForm.expectSuggestIsDisplayed();
  await app.shoppingPage.header.searchForm.expectSuggestToHaveCount(5);
  await app.shoppingPage.header.searchForm.expectSuggestToContains("ivanka");
});

test("Check suggest on the music search", async ({ app }) => {
  //Actions
  await app.home.open();
  await app.home.header.searchForm.inputSearchCriteria("ivanka");
  await app.home.header.searchForm.clickEnterSearchField();
  await app.webPage.header.clickMusicSearchButton();
  await app.musicPage.track.expectMusicTracksToBeVisible();
  await app.musicPage.header.searchForm.clickSearchField();

  //Assert
  await app.musicPage.header.searchForm.expectSuggestIsDisplayed();
  await app.musicPage.header.searchForm.expectSuggestToHaveCount(5);
  await app.musicPage.header.searchForm.expectSuggestToContains("ivanka");
});
